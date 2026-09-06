export { default as WelcomePage } from "./WelcomePage";
export { default as RoleSelection } from "./RoleSelection";
export { default as TeacherSetup } from "./TeacherSetup";
export { default as StudentSetup } from "./StudentSetup";
export { default as LogoutButton } from "./LogoutButton";
export { default as ProtectedAuthRedirect } from "./ProtectedAuthRedirect";
export { default as useAuth } from "./useAuth";
export {
  AUTH_STORAGE_KEY,
  clearCurrentUser,
  createLocalUser,
  getCurrentUser,
  saveCurrentUser,
} from "./authService";
