import { useLanguages } from "./useLanguages";

export default function LanguageSelector({
  value,
  onChange,
  label = "Language",
  includeNativeName = true,
}) {
  const { languages } = useLanguages();

  return (
    <label className="language-selector">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {includeNativeName
              ? `${language.nativeName} — ${language.name}`
              : language.name}
          </option>
        ))}
      </select>
    </label>
  );
}
