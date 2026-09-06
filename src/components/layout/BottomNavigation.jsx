import { NavLink } from "react-router-dom";
import {
  Home,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Layers,
  Settings,
} from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/teacher", label: "Teacher", icon: GraduationCap },
  { to: "/student", label: "Student", icon: BookOpen },
  { to: "/quizzes", label: "Quizzes", icon: ClipboardList },
  { to: "/flashcards", label: "Flashcards", icon: Layers },
  { to: "/settings", label: "Settings", icon: Settings },
];

function BottomNavigation() {
  return (
    <nav className="bottom-navigation" aria-label="Primary navigation">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `bottom-navigation__item${isActive ? " is-active" : ""}`
          }
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNavigation;
