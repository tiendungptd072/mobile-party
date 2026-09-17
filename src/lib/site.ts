import type { Metadata } from "next";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

/** Public origin used for canonical URLs; override it during deployment. */
export const SITE_URL =
  configuredUrl && /^https?:\/\//.test(configuredUrl)
    ? configuredUrl.replace(/\/$/, "")
    : "https://mobile-party.dev";

type PageMetadataInput = {
  description: string;
  path: string;
  title: string;
};

export function createPageMetadata({
  description,
  path,
  title,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { card: "summary_large_image", title, description },
  };
}
