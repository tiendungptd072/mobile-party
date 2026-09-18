"use client";

import { Container } from "@/components/ui/container";
import { useLocaleMessages } from "@/features/locale/use-locale-messages.client";

export function SiteFooter() {
  const messages = useLocaleMessages();
  return (
    <footer className="border-t border-subtle">
      <Container className="flex flex-col gap-1 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Mobile Party</p>
        <p>{messages.footer}</p>
      </Container>
    </footer>
  );
}
