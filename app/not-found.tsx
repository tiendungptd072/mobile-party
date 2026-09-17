import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex flex-1 items-center py-16 sm:py-24">
      <section className="max-w-xl">
        <p className="font-mono text-sm font-medium text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          This resource is not available.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          The route may be incorrect, or the requested content has not been
          published for this technology pair.
        </p>
        <Link
          className="mt-8 inline-flex h-10 items-center rounded-lg border border-subtle bg-surface px-4 text-sm font-medium transition-colors hover:bg-surface-raised"
          href="/"
        >
          Return home
        </Link>
      </section>
    </Container>
  );
}
