import { useId } from "react";

function RadioGroup({ label, options = [], value, onChange, name }) {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  return <fieldset className="radio-group">
    {label && <legend>{label}</legend>}
    {options.map((option) => <label key={option.value} className="radio-group__option">
      <input type="radio" name={groupName} value={option.value}
        checked={value === option.value}
        onChange={(event) => onChange?.(event.target.value)} />
      <span>{option.label}</span>
    </label>)}
  </fieldset>;
}
export default RadioGroup;
