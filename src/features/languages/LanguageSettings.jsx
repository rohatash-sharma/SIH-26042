import { useState } from "react";
import { Check, Globe2, Languages as LanguagesIcon, Save } from "lucide-react";
import { useLanguages } from "./useLanguages";

function LanguageCard({ language, selected, onClick, multi = false }) {
  return (
    <button
      type="button"
      className={`language-card ${selected ? "is-selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="language-card__icon">
        {selected ? <Check size={20} /> : <Globe2 size={20} />}
      </span>
      <span className="language-card__content">
        <strong>{language.nativeName}</strong>
        <small>{language.name}</small>
      </span>
      {multi && <span className="language-card__code">{language.code}</span>}
    </button>
  );
}

export default function LanguageSettings({ role = "student" }) {
  const {
    languages,
    interfaceLanguage,
    learningLanguage,
    teacherLanguages,
    updateInterfaceLanguage,
    updateLearningLanguage,
    updateTeacherLanguages,
  } = useLanguages();

  const [saved, setSaved] = useState(false);

  const toggleTeacherLanguage = (code) => {
    const next = teacherLanguages.includes(code)
      ? teacherLanguages.filter((item) => item !== code)
      : [...teacherLanguages, code];

    if (next.length > 0) updateTeacherLanguages(next);
  };

  const savePreferences = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <main className="language-settings-page">
      <header className="language-settings-page__header">
        <div>
          <span className="eyebrow">
            <LanguagesIcon size={16} />
            Language Preferences
          </span>
          <h1>Languages</h1>
          <p>
            Interface language and learning-content language are independent.
          </p>
        </div>
      </header>

      <section className="language-settings-section">
        <div className="language-settings-section__heading">
          <div>
            <h2>Interface language</h2>
            <p>Controls menus, buttons, labels, and navigation.</p>
          </div>
        </div>

        <div className="language-grid">
          {languages.map((language) => (
            <LanguageCard
              key={language.code}
              language={language}
              selected={interfaceLanguage === language.code}
              onClick={() => updateInterfaceLanguage(language.code)}
            />
          ))}
        </div>
      </section>

      <section className="language-settings-section">
        <div className="language-settings-section__heading">
          <div>
            <h2>Learning content language</h2>
            <p>
              Controls the language used for lessons, quizzes, and flashcards.
            </p>
          </div>
        </div>

        <div className="language-grid">
          {languages.map((language) => (
            <LanguageCard
              key={language.code}
              language={language}
              selected={learningLanguage === language.code}
              onClick={() => updateLearningLanguage(language.code)}
            />
          ))}
        </div>
      </section>

      {role === "teacher" && (
        <section className="language-settings-section">
          <div className="language-settings-section__heading">
            <div>
              <h2>Enabled content languages</h2>
              <p>
                Choose which languages teachers can use while creating content.
              </p>
            </div>
          </div>

          <div className="language-grid">
            {languages.map((language) => (
              <LanguageCard
                key={language.code}
                language={language}
                selected={teacherLanguages.includes(language.code)}
                onClick={() => toggleTeacherLanguage(language.code)}
                multi
              />
            ))}
          </div>
        </section>
      )}

      <div className="language-settings-page__actions">
        <button type="button" className="language-save-button" onClick={savePreferences}>
          <Save size={18} />
          {saved ? "Saved locally" : "Save preferences"}
        </button>
      </div>
    </main>
  );
}
