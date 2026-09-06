import { NavLink } from "react-router-dom";

function Sidebar({ items = [] }) {
  return (
    <aside className="sidebar">
      <nav aria-label="Main navigation">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              ["sidebar__link", isActive ? "is-active" : ""]
                .filter(Boolean)
                .join(" ")
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
