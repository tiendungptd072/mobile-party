"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { TechnologySwitcher } from "@/features/technology-switcher/technology-switcher.client";
import { LocaleSelector } from "@/features/locale/locale-selector.client";
import { ThemeSelector } from "@/features/theme/theme-selector.client";
import { getTechnologies } from "@/lib/content/technologies";
import {
  getLocaleFromPathname,
  getLocalizedPath,
  useLocaleMessages,
} from "@/features/locale/use-locale-messages.client";

export function SiteHeader() {
  const messages = useLocaleMessages();
  const locale = getLocaleFromPathname(usePathname());
  const technologies = getTechnologies();

  return (
    <header className="sticky top-0 z-40 border-b border-subtle bg-background/90 backdrop-blur">
      <Container className="flex min-h-16 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
        <Link
          href={`/${locale}`}
          className="rounded-sm text-base font-semibold tracking-tight"
        >
          Mobile Party
        </Link>

        <div className="order-3 flex w-full justify-center sm:order-none sm:w-auto sm:flex-1 sm:justify-end">
          <TechnologySwitcher technologies={technologies} />
        </div>

        <Link
          className="rounded-sm text-sm font-medium text-muted hover:text-foreground"
          href={getLocalizedPath("/bookmarks", locale)}
        >
          {messages.bookmarks}
        </Link>

        <LocaleSelector />
        <ThemeSelector />
      </Container>
    </header>
  );
}
