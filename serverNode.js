require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 2323;
const { MongoClient, Decimal128 } = require('mongodb');
const client = new MongoClient(process.env.URI);
const database = client.db("sample_airbnb"); //database name defined in mongo atlas sample
const collections = database.collection("listingsAndReviews"); // collection name defined in mongo atlas sample



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});