import Select from "./Select";

function LanguageSwitcher({ value, onChange, languages = [] }) {
  const options = languages.map((language) => ({
    value: language.code,
    label: language.nativeName ?? language.name ?? language.code
  }));

  return <Select
    label="Language"
    value={value}
    onChange={(event) => onChange?.(event.target.value)}
    options={options}
    placeholder="Select language"
  />;
}
export default LanguageSwitcher;
