"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import {
  getLocaleFromPathname,
  useLocaleMessages,
} from "@/features/locale/use-locale-messages.client";

export default function LocaleNotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const messages = useLocaleMessages();

  return (
    <Container className="flex flex-1 items-center py-16 sm:py-24">
      <section className="max-w-xl">
        <p className="font-mono text-sm font-medium text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {messages.notFound.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {messages.notFound.description}
        </p>
        <Link
          className="mt-8 inline-flex h-10 items-center rounded-lg border border-subtle bg-surface px-4 text-sm font-medium transition-colors hover:bg-surface-raised"
          href={`/${locale}`}
        >
          {messages.notFound.home}
        </Link>
      </section>
    </Container>
  );
}
