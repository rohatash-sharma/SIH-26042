import { Search, X } from "lucide-react";
import Input from "./Input";

function SearchBar({ value, onChange, placeholder = "Search...", onClear, className = "" }) {
  return <div className={["search-bar", className].filter(Boolean).join(" ")}>
    <Search size={18} aria-hidden="true" />
    <Input value={value} onChange={onChange} placeholder={placeholder} aria-label="Search" />
    {value && <button type="button" onClick={onClear} aria-label="Clear search"><X size={18} /></button>}
  </div>;
}
export default SearchBar;
