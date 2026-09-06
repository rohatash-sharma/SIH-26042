import { useLanguages } from "./useLanguages";

export default function TranslationText({ value, fallback = "—", as: Tag = "span" }) {
  const { learningLanguage, resolveTranslation } = useLanguages();
  const text = resolveTranslation(value, learningLanguage);

  return <Tag>{text || fallback}</Tag>;
}
