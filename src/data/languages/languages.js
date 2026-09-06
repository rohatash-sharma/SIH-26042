export const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "sat", name: "Santhali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ" }
];

export const languageMap = Object.fromEntries(
  languages.map((language) => [language.code, language])
);

export const LANGUAGES = languages;
