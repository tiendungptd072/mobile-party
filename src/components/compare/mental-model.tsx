"use client";

import { Callout } from "@/components/ui/callout";
import { useLocaleMessages } from "@/features/locale/use-locale-messages.client";

type MentalModelProps = {
  children: string;
};

export function MentalModel({ children }: MentalModelProps) {
  const messages = useLocaleMessages();

  return (
    <Callout title={messages.compare.mentalModel} tone="info">
      {children}
    </Callout>
  );
}
