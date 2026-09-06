import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  Home,
  Languages,
  Layers3,
  Settings,
  Users,
} from "lucide-react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNavigation from "./BottomNavigation";
import OfflineIndicator from "../common/OfflineIndicator";
import useAuth from "../../features/auth/useAuth";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role } = useAuth();
  const location = useLocation();

  const isTeacher = role === "teacher";

  const navigationItems = isTeacher
    ? [
        { to: "/teacher", label: "Dashboard", icon: <Home size={19} />, end: true },
        { to: "/teacher/content", label: "Content", icon: <BookOpen size={19} /> },
        { to: "/teacher/classroom", label: "Classroom", icon: <Users size={19} /> },
        { to: "/teacher/progress", label: "Progress", icon: <BarChart3 size={19} /> },
        { to: "/teacher/languages", label: "Languages", icon: <Languages size={19} /> },
        { to: "/teacher/settings", label: "Settings", icon: <Settings size={19} /> },
      ]
    : [
        { to: "/student", label: "Home", icon: <Home size={19} />, end: true },
        { to: "/student/learn", label: "Learn", icon: <BookOpen size={19} /> },
        { to: "/student/revision", label: "Revision", icon: <Layers3 size={19} /> },
        { to: "/student/progress", label: "Progress", icon: <BarChart3 size={19} /> },
        { to: "/student/languages", label: "Languages", icon: <Languages size={19} /> },
        { to: "/student/settings", label: "Settings", icon: <Settings size={19} /> },
      ];

  return (
    <div className="app-layout" data-role={role} data-path={location.pathname}>
      <Header onMenuClick={() => setSidebarOpen((open) => !open)} />

      <OfflineIndicator />

      <div className="app-layout__body">
        <Sidebar
          items={navigationItems}
          open={sidebarOpen}
          onNavigate={() => setSidebarOpen(false)}
        />

        <div className="app-layout__content">
          {children}
        </div>
      </div>

      <BottomNavigation items={navigationItems.slice(0, 4)} />
    </div>
  );
}
