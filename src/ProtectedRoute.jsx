import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  if (role && localStorage.getItem("role") !== role) return <Navigate to="/" />;
  return children;
}
