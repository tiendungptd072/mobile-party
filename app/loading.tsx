import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container
      className="flex-1 py-12 sm:py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="h-4 w-28 animate-pulse rounded bg-surface-raised" />
      <div className="mt-6 h-12 max-w-2xl animate-pulse rounded bg-surface-raised" />
      <div className="mt-4 h-5 max-w-xl animate-pulse rounded bg-surface-raised" />
    </Container>
  );
}
