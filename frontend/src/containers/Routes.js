import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Login from "./Login";
import Signup from "./Signup";
import NewNote from "./NewNote";
import Notes from "./Notes";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/notes/new" element={<NewNote />} />
      <Route path="/notes/:id" element={<Notes />} />
      <Route path="*" element={<NotFound />} />
      {/* catch all unmatched routes */}
      {/* This needs to always be the last route in the <Routes> block. */}
      {/* You can think of it as the route that handles requests in case all the other routes before it have failed. */}
    </Routes>
  );
}
