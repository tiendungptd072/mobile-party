const contracts = {
  Citation: ["source"],
  Figure: ["id", "src", "alt", "caption", "sources"],
  Snippet: ["path", "language"],
};

function literalValue(node, fail) {
  if (node?.type === "Literal" && typeof node.value === "string") {
    return node.value;
  }
  if (node?.type === "ArrayExpression") {
    return node.elements.map((element) => {
      const value = literalValue(element, fail);
      if (typeof value !== "string") fail("expected a literal string array");
      return value;
    });
  }
  fail("component attributes must be static strings or string arrays");
}

function attributes(node, fail) {
  const result = {};
  for (const attribute of node.attributes) {
    if (
      attribute.type !== "mdxJsxAttribute" ||
      !contracts[node.name].includes(attribute.name) ||
      Object.hasOwn(result, attribute.name)
    ) {
      fail("unknown, spread, or duplicate component attribute");
    }
    result[attribute.name] =
      typeof attribute.value === "string"
        ? attribute.value
        : literalValue(
            attribute.value?.data?.estree?.body?.[0]?.expression,
            fail,
          );
  }
  for (const name of contracts[node.name]) {
    if (name === "sources") continue;
    if (typeof result[name] !== "string" || !result[name].trim()) {
      fail("expected a non-empty " + name + " attribute");
    }
  }
  if (
    result.sources !== undefined &&
    (!Array.isArray(result.sources) ||
      result.sources.some(
        (source) => typeof source !== "string" || !source.trim(),
      ))
  ) {
    fail("sources must be a literal string array");
  }
  return result;
}

function headingText(node, fail) {
  if (node.type === "text" || node.type === "inlineCode") return node.value;
  if (["heading", "strong", "emphasis", "delete", "link"].includes(node.type)) {
    return node.children.map((child) => headingText(child, fail)).join("");
  }
  fail("headings must contain static text, inline code, or emphasis");
}

// Only JSON-shaped compiler data is emitted, never executable author expressions.
function expression(value) {
  if (Array.isArray(value)) {
    return { type: "ArrayExpression", elements: value.map(expression) };
  }
  if (typeof value === "object" && value !== null) {
    return {
      type: "ObjectExpression",
      properties: Object.entries(value).map(([key, item]) => ({
        type: "Property",
        kind: "init",
        method: false,
        shorthand: false,
        computed: false,
        key: { type: "Literal", value: key },
        value: expression(item),
      })),
    };
  }
  return { type: "Literal", value };
}

/** Assign heading IDs and export the same structural data used by validation. */
export default function remarkFoundations() {
  return (tree, file) => {
    const path = String(file.path ?? "").replace(/\\/g, "/");
    if (!/(?:^|\/)foundations\/(?:en|vi)\//.test(path)) return;
    const data = {
      headings: [],
      citations: [],
      figures: [],
      snippets: [],
      links: [],
      hasContent: tree.children.length > 0,
    };
    const usedIds = new Set();
    let previousLevel = 1;

    function visit(node) {
      const fail = (message) => file.fail(message, node.position);
      if (node.type === "heading") {
        if (node.depth === 1 || node.depth > previousLevel + 1) {
          fail("body headings must start at H2 without skipping levels");
        }
        previousLevel = node.depth;
        const text = headingText(node, fail);
        const normalized = text
          .normalize("NFKD")
          .replace(/\p{M}/gu, "")
          .toLowerCase()
          .replace(/đ/g, "d")
          .replace(/[^\p{L}\p{N}]+/gu, "-")
          .replace(/^-|-$/g, "");
        const base = "section-" + (normalized || "heading");
        let id = base;
        let suffix = 2;
        while (usedIds.has(id)) id = base + "-" + suffix++;
        usedIds.add(id);
        node.data = {
          ...node.data,
          hProperties: { ...node.data?.hProperties, id },
        };
        data.headings.push({ id, text, level: node.depth });
      }
      if (
        ["mdxjsEsm", "mdxFlowExpression", "mdxTextExpression"].includes(
          node.type,
        )
      ) {
        fail(
          "Foundation bodies cannot contain imports, exports, or expressions",
        );
      }
      if (node.type === "image" || node.type === "imageReference") {
        fail("use Figure for article illustrations");
      }
      if (node.type === "link") data.links.push(node.url);
      if (node.type === "linkReference") {
        fail("use inline Markdown links so article targets can be validated");
      }
      if (
        node.type === "footnoteDefinition" ||
        node.type === "footnoteReference"
      ) {
        fail("use Citation for article references");
      }
      if (
        node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement"
      ) {
        if (!Object.hasOwn(contracts, node.name)) {
          fail("unsupported Foundation component: " + node.name);
        }
        if (node.name !== "Citation" && node.type !== "mdxJsxFlowElement") {
          fail("Figure and Snippet must be standalone blocks");
        }
        if (node.children.length)
          fail("Foundation components must be self-closing");
        const props = attributes(node, fail);
        if (node.name === "Citation") data.citations.push(props.source);
        if (node.name === "Figure") {
          data.figures.push({ ...props, sources: props.sources ?? [] });
        }
        if (node.name === "Snippet") data.snippets.push(props);
      }
      for (const child of node.children ?? []) visit(child);
    }

    visit(tree);
    tree.children.push({
      type: "mdxjsEsm",
      value: "export const foundation = " + JSON.stringify(data) + ";",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              source: null,
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "foundation" },
                    init: expression(data),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
}
