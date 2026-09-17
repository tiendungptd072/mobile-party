import { notFound } from "next/navigation";
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

type LocaleHomePageProps = { params: Promise<{ locale: string }> };

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = getMessages(locale);
  const isVietnamese = locale === "vi";

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
            <CardTitle>
              {isVietnamese ? "Chọn lộ trình học" : "Choose your learning path"}
            </CardTitle>
            <CardDescription>
              {isVietnamese
                ? "Lựa chọn được lưu trên thiết bị này và có thể thay đổi bất cứ lúc nào."
                : "Your selection is saved on this device and can be changed anytime."}
            </CardDescription>
          </CardHeader>
          <div className="px-5 pb-5">
            <TechnologyPairForm technologies={getTechnologies()} />
          </div>
        </Card>
      </div>
    </Container>
  );
}
