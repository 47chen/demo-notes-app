import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./containers/Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./lib/contextLib";
import { Auth } from "aws-amplify";

function App() {
  // To make our login information persist we need to store and load it from the browser session.
  // This load user seesion
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    userHasAuthenticated(false);
  };

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {/* grab the current path the user os on 
            acticeKey of Nav highlight the link when we are on that page*/}
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                {/* The <> or Fragment component can be thought of as a placeholder component. 
              We need this because in the case the user is not logged in, 
              we want to render two links. 
              To do this we would need to wrap it inside a single component, 
              like a div. But by using the Fragment component it tells React that the two links are inside this component but we don’t want to render any extra HTML. */}
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

//This adds two links to our navbar inside the Nav Bootstrap component.
//The Navbar.Collapse component ensures that on mobile devices
//the two links will be collapsed.

export default App;
