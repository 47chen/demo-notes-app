import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Login from "./Login";
import Signup from "./Signup";
import NewNote from "./NewNote";
import Notes from "./Notes";
import Settings from "./Settings";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/notes/new"
        element={
          <AuthenticatedRoute>
            <NewNote />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/notes/:id"
        element={
          <AuthenticatedRoute>
            <Notes />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthenticatedRoute>
            <Settings />
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
      {/* catch all unmatched routes */}
      {/* This needs to always be the last route in the <Routes> block. */}
      {/* You can think of it as the route that handles requests in case all the other routes before it have failed. */}
    </Routes>
  );
}
