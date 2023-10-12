// const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NyekgH7vfosreCK1OL668ZAOBB9tIkNw1q3B5mxQxcNTmx9vtF4tqBGMmCl0ZRn9nIBvhkJCr7pYCfmnjc42BIZ00dlX5qobJ"
);

const app = express();
const PORT = 5000;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved for this amount >>>", total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    response.status(200).send({
      message: "can't process the payment",
    });
  }
});

// exports.api = functions.https.onRequest(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
  console.log(`http://localhost:${PORT}/`);
});