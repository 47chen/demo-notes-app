import React, { cloneElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

export default function UnauthenticatedRoute(props) {
  const { isAuthenticated } = useAppContext();
  const { children } = props;

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return cloneElement(children, props);
}

/* The cloneElement above makes sure that passed in state is handled correctly for child components of UnauthenticatedRoute routes. */
