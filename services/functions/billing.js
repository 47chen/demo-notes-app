import Stripe from "stripe";
import handler from "../util/handler";
import { calculateCost } from "../util/cost";

export const main = handler(async (event) => {
  // get storage and source from the request body
  // storage -> the number of notes that users would like to store in their account
  // source -> the Stripe token for the card that we are going to charge
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });

  return { status: true };
});
