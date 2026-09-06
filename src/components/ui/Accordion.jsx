import { useState } from "react";
import { ChevronDown } from "lucide-react";

function Accordion({ items = [], multiple = false }) {
  const [openItems, setOpenItems] = useState([]);

  function toggle(value) {
    setOpenItems((current) => {
      if (current.includes(value)) return current.filter((item) => item !== value);
      return multiple ? [...current, value] : [value];
    });
  }

  return <div className="accordion">
    {items.map((item) => {
      const open = openItems.includes(item.value);
      return <div key={item.value} className={["accordion__item", open ? "is-open" : ""].filter(Boolean).join(" ")}>
        <button type="button" className="accordion__trigger" aria-expanded={open} onClick={() => toggle(item.value)}>
          <span>{item.title}</span><ChevronDown size={18} aria-hidden="true" />
        </button>
        {open && <div className="accordion__content">{item.content}</div>}
      </div>;
    })}
  </div>;
}
export default Accordion;
