import type { Locale } from "@/lib/i18n/locale";

const messages = {
  en: {
    language: "Language",
    english: "English",
    vietnamese: "Vietnamese",
    home: {
      eyebrow: "Four mobile frameworks · One mental map",
      title: "Learn a new mobile framework using the one you already know.",
      description:
        "Translate familiar concepts across React Native, Flutter, Jetpack Compose, and SwiftUI—with explicit guidance when a mapping is not one-to-one.",
    },
  },
  vi: {
    language: "Ngôn ngữ",
    english: "Tiếng Anh",
    vietnamese: "Tiếng Việt",
    home: {
      eyebrow: "Bốn framework di động · Một bản đồ tư duy",
      title: "Học framework di động mới từ framework bạn đã biết.",
      description:
        "Đối chiếu các khái niệm quen thuộc giữa React Native, Flutter, Jetpack Compose và SwiftUI—đồng thời nêu rõ khi chúng không tương đương một-một.",
    },
  },
} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}
