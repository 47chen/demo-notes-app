import React, { useState } from "react";
import { API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { onError } from "../lib/errorLib";
import config from "../config";
import { loadStripe } from "@stripe/stripe-js";

export default function Settings() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const stripePromise = loadStripe(config.STRIPE_KEY);
  const billUser = (details) => {
    return API.post("notes", "/billing", {
      body: details,
    });
  };

  return <div className="Settings"></div>;
}
