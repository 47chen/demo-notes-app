import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/contextLib";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const { userHasAuthenticated } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      // Auth.signIn -> This method returns a promise since it will be logging in the user asynchronously.
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      //   alert("Logged in");
      nav("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
