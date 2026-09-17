import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-subtle">
      <Container className="flex flex-col gap-1 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Mobile Party</p>
        <p>Static-first. Server-first. Built for transferable knowledge.</p>
      </Container>
    </footer>
  );
}
