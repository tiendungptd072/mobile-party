import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { TechnologyPairForm } from "@/features/technology-switcher/technology-pair-form.client";
import { getTechnologies } from "@/lib/content/technologies";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale } from "@/lib/i18n/locale";
import { createLocalizedPageMetadata } from "@/lib/site";

type LocaleHomePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LocaleHomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const messages = getMessages(locale);
  return createLocalizedPageMetadata({
    locale,
    path: "/",
    title: "Mobile Party",
    description: messages.home.description,
  });
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = getMessages(locale);

  return (
    <Container className="flex-1 py-12 sm:py-16 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:gap-16">
        <section aria-labelledby="page-title">
          <Badge variant="accent">{messages.home.eyebrow}</Badge>
          <h1
            id="page-title"
            className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {messages.home.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted">
            {messages.home.description}
          </p>
        </section>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>{messages.home.choosePath}</CardTitle>
            <CardDescription>{messages.home.selectionNote}</CardDescription>
          </CardHeader>
          <div className="px-5 pb-5">
            <TechnologyPairForm technologies={getTechnologies()} />
          </div>
        </Card>
      </div>
    </Container>
  );
}
