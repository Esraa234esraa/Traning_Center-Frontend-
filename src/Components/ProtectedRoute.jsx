// src/Components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import LoadingSpinner from "./Loading"; // component بسيط للتحميل

export default function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
