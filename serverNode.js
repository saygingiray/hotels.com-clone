require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 2323;
const { MongoClient, Decimal128 } = require('mongodb');
const { query } = require('express');
const client = new MongoClient(process.env.URI);
const database = client.db("sample_airbnb"); //database name defined in mongo atlas sample
const collections = database.collection("listingsAndReviews"); // collection name defined in mongo atlas sample

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get("/locationSearch", async (req, res) => {

    let datasReceived = req.query;
    console.log(datasReceived);

    let queryX = {};
    queryX["address.street"] = { $regex: "(?i)" + datasReceived.address }

    let optionsX = {};
    optionsX.projection = { "_id": 0, 'address.street': 1, 'address.suburb': 1, 'address.market': 1 };

    try {
        await client.connect();
        const dataDBX = await collections.find(queryX, optionsX).toArray();
        console.log(dataDBX.length)
        //finding  suburbs
        let filteredDataofSuburbs = [];
        let suburbObj = {};
        dataDBX.map(item => { filteredDataofSuburbs.push(item.address.suburb) })
        filteredDataofSuburbs.forEach(element => { suburbObj[element] = (suburbObj[element] || 0) + 1 });
        const sortedSuburb = Object.entries(suburbObj).sort(([, a], [, b]) => b - a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        console.log(Object.entries(sortedSuburb))
        //finding cities
        let filteredDataofCities = [];
        let cityObj = {};
        dataDBX.map(item => { filteredDataofCities.push(item.address.market) })
        filteredDataofCities.forEach(element => { cityObj[element] = (cityObj[element] || 0) + 1 });
        const sortedCity = Object.entries(cityObj).sort(([, a], [, b]) => b - a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        console.log(Object.entries(sortedCity))

        const dataToSend = {
            totalResults: dataDBX.length,
            suburbs: Object.entries(sortedSuburb),
            cities: Object.entries(sortedCity),
        }

        await res.json(dataToSend);
    }
    catch (err) {
        console.log(err);
    }
})

app.get("/nameSearch", async (req, res) => {

    let datasReceived = req.query;
    console.log(datasReceived);

    let queryX = {};
    queryX["name"] = { $regex: "(?i)" + datasReceived.name }

    let optionsX = {};
    optionsX.projection = { "_id": 0, 'address.street': 1, 'name': 1, };
    optionsX.limit = 20

    try {
        await client.connect();
        const dataDBX = await collections.find(queryX, optionsX).toArray();
        console.log(dataDBX.length)
        console.log(dataDBX)
        await res.json(dataDBX);
    }
    catch (err) {
        console.log(err);
    }


});


app.get("/propertyList", async (req, res) => {
    try {
        await client.connect();
        const dataDBX = await collections.distinct("property_type")
        // const dataDBX2 = await collections.distinct("room_type")
        // console.log(dataDBX2)
        await res.json(dataDBX);
    }
    catch (err) {
        console.log(err);
    }
});

app.get("/search", async (req, res) => {

    /// query strings
    let datasReceived = req.query;
    console.log(datasReceived);
    let queryX = {};

    if (!datasReceived.priceRange == "") { let tempArr = datasReceived.priceRange.split(","); queryX.price = { $gte: Decimal128(String(tempArr[0])), $lte: Decimal128(String(tempArr[1])) } }
    if (!datasReceived.guestRating == "") { let points = datasReceived.guestRating.slice(0, 2); let temp_str = "review_scores.review_scores_rating"; queryX[temp_str] = { $gte: Number(points) } }
    if (!datasReceived.propertyClass == "") { let points = datasReceived.propertyClass.slice(0, 1); let temp_str = "host.host_listings_count"; queryX[temp_str] = { $gte: Number(points) } }
    if (!datasReceived.propertySelected == "") { let tempArr3 = datasReceived.propertySelected.split(","); queryX.property_type = { "$in": tempArr3 } }
    if (!datasReceived.bedTypes == "") { let tempArr3 = datasReceived.bedTypes.split(","); queryX.bed_type = { "$in": tempArr3 } }
    if (!datasReceived.amenities == "") { let tempArr3 = datasReceived.amenities.split(","); queryX.amenities = { "$in": tempArr3 } }
    if (!datasReceived.roomTypes == "") { let tempArr3 = datasReceived.roomTypes.split(","); queryX.room_type = { "$in": tempArr3 } }

    console.log(queryX)

    /// options strings

    let optionsX = {};
    optionsX.projection = { name: 1, summary:1, price: 1, 'review_scores.review_scores_rating': 1, "host.host_listings_count":1,   property_type: 1, bed_type:1, amenities:1, room_type:1 , 'images.picture_url': 1, 'address.street': 1, number_of_reviews:1 };
    optionsX.limit = 20


    try {
        await client.connect();
        const dataDBX = await collections.find(queryX, optionsX).toArray();
        const countNumber = await collections.countDocuments(queryX)

        const dataToSend = {
            number: countNumber,
            data: dataDBX,

        }
        await res.json(dataToSend);
    }
    catch (err) {console.log(err); }
});




















app.listen(PORT, () => {


    console.log(`Server listening on ${PORT}`);
})