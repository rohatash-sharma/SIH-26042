# SIH 26042 — Languages Module

The Languages module provides the independent language system used by the
offline-first frontend.

## Supported languages

The module reads the canonical language list from:

`src/data/languages/languages.js`

The initial project supports:

- English (`en`)
- Hindi (`hi`)
- Santhali (`sat`)

## Important design

Interface language and learning-content language are intentionally separate.

```text
Interface Language
  └── menus, buttons, navigation, labels

Learning Content Language
  └── lessons, quizzes, flashcards

Teacher Enabled Languages
  └── languages available while creating content
```

This allows a teacher or student to keep the application interface in one
language while studying content in another.

## Files

- `languageService.js` — local preference persistence and translation helpers.
- `useLanguages.js` — React hook for language state.
- `LanguageSettings.jsx` — reusable settings screen.
- `TeacherLanguageSettings.jsx` — teacher language-management screen.
- `StudentLanguageSettings.jsx` — student language-preference screen.
- `LanguageSelector.jsx` — reusable select control.
- `TranslationText.jsx` — translation-aware text renderer.
- `languageRoutes.jsx` — protected teacher/student language routes.

## Persistence

Language preferences are stored through the existing `storageService`,
which uses localStorage with the `sih26042:` namespace.

No API, backend, Supabase, authentication server, or network request is
required.

## Translation fallback

For a multilingual object such as:

```js
{
  en: "Water",
  hi: "जल",
  sat: "..."
}
```

the resolver uses:

1. selected learning language
2. English
3. first available non-empty translation

This means content remains readable even when a particular translation is
not yet available.

## Routes

Teacher:

`/teacher/languages`

Student:

`/student/languages`

## Integration notes

The existing UI library already contains a `LanguageSwitcher`. This module
owns the language state and persistence; the switcher can call
`useLanguages().updateInterfaceLanguage()` or
`useLanguages().updateLearningLanguage()`.

For lessons, quizzes, and flashcards, use:

```js
resolveTranslation(content.title, learningLanguage)
```

or the `TranslationText` component.

The module is deliberately CSS-free so the project's final unified stylesheet
can control all visual styling consistently.
