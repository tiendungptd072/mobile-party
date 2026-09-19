import { reactNativeToKotlinEntry } from "@content/roadmaps/react-native-to-kotlin-entry";
import { viReactNativeToKotlinEntry } from "@content/locales/vi-learning-entry";
import type { Locale } from "@/lib/i18n/locale";
import type { LearningEntryGuide } from "@/types/learning-entry";

export function getReactNativeToKotlinEntryGuide(
  locale: Locale,
): LearningEntryGuide {
  return locale === "vi"
    ? viReactNativeToKotlinEntry
    : reactNativeToKotlinEntry;
}
