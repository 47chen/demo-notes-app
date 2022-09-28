import React from "react";
import "./Home.css";

//This simply renders our homepage given that the user is not currently signed in.
export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
      </div>
    </div>
  );
}
