import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import { TechnologyPairForm } from "@/features/technology-switcher/technology-pair-form.client";
import { getTechnologies } from "@/lib/content/technologies";

const benefits = [
  {
    title: "Learn by comparison",
    description:
      "Start from APIs and patterns you already use instead of relearning programming fundamentals.",
  },
  {
    title: "Same problem, different framework",
    description:
      "Compare equivalent behavior side by side while keeping framework-specific idioms visible.",
  },
  {
    title: "Real-world recipes",
    description:
      "Move from isolated APIs to practical flows such as networking, storage, and authentication.",
  },
  {
    title: "Mental-model differences",
    description:
      "See where a familiar analogy stops working before it becomes a production mistake.",
  },
] as const;

export default function Home() {
  const technologies = getTechnologies();

  return (
    <Container className="flex-1 py-12 sm:py-16 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:gap-16">
        <section aria-labelledby="page-title">
          <Badge variant="accent">
            Four mobile frameworks · One mental map
          </Badge>
          <h1
            id="page-title"
            className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Learn a new mobile framework using the one you already know.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted">
            Translate familiar concepts across React Native, Flutter, Jetpack
            Compose, and SwiftUI—with explicit guidance when the mapping is not
            one-to-one.
          </p>
        </section>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Choose your learning path</CardTitle>
            <CardDescription>
              Your selection is saved on this device and can be changed anytime.
            </CardDescription>
          </CardHeader>
          <div className="px-5 pb-5">
            <TechnologyPairForm technologies={technologies} />
          </div>
        </Card>
      </div>

      <section className="mt-20 sm:mt-24" aria-labelledby="approach-title">
        <p className="font-mono text-sm font-medium text-accent">
          How it works
        </p>
        <h2
          id="approach-title"
          className="mt-2 text-2xl font-semibold sm:text-3xl"
        >
          Transfer knowledge instead of starting over
        </h2>
        <ResponsiveGrid className="mt-8" columns={4}>
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardHeader>
                <CardTitle>{benefit.title}</CardTitle>
                <CardDescription>{benefit.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </ResponsiveGrid>
      </section>
    </Container>
  );
}
