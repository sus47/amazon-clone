const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51HPxooGWA6aNc9yLCQfhUpLVB6VGettrPXwdl8o1EHGrafJPdYaMLbjE6OQE7firhpkrTlLCcH1XhkXt0T8hBE5p001Nej0Xc8');

//API

//- App Config
const app = express();

//- Middle Wares
app.use(cors({ origin: true }));
app.use(express.json());
//to get app up and running on local , we emulate it
// run firebase emulators:start in terminal

//- API routes
app.get('/', (request, response) => response.status(200).send('hello world'))


//in payment.js there is:
//url: `payments/create
app.post("/payments/create", async(request, response) => {
    const total = request.query.total;
    console.log("Payment Request Received BOOM!!! for this amount >>> ", total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of currency
        currency: "usd", // need to change to correct country code
    });
    // Ok - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//- Listen Command
exports.api = functions.https.onRequest(app)

//Example endpoint
// http://localhost:5001/clone-4acce/us-central1/api