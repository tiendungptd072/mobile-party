import { Callout } from "@/components/ui/callout";

type MentalModelProps = {
  children: string;
};

export function MentalModel({ children }: MentalModelProps) {
  return (
    <Callout title="Mental model" tone="info">
      {children}
    </Callout>
  );
}
