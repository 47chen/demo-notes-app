import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

export default function AuthenticatedRoute({ children }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${pathname}${search}`} />;
  }
  return children;
}

/* AuthenticatedRoute has a prop called children 
that represents all child components. 
Example child components in our case would be NewNote, Notes and Settings. */
