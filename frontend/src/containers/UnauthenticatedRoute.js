import { ResultType } from "@remix-run/router/dist/utils";
import React, { cloneElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

// This method takes the querystring param we want to read and returns it.

// https://regexr.com/ -> for regular expression
const querystring = (name, url = window.location.href) => {
  const parsedName = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export default function UnauthenticatedRoute(props) {
  const { isAuthenticated } = useAppContext();
  const { children } = props;
  const redirect = querystring("redirect");

  if (isAuthenticated) {
    return <Navigate to={redirect || "/"} />;
  }

  return cloneElement(children, props);
}

/* The cloneElement above makes sure that passed in state is handled correctly for child components of UnauthenticatedRoute routes. */
