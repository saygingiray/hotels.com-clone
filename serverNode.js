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
    optionsX.projection = { "_id": 0, 'address.street': 1, 'address.suburb': 1, 'address.market' : 1 };
    


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
            cities : Object.entries(sortedCity),
        }

        await res.json(dataToSend);
    }
    catch (err) {
        console.log(err);
    }



    // /// query strings
    //     let queryX = {};

    //     if (!datasReceived.type == "") {let tempArr3 = datasReceived.type.split(","); if(typeof tempArr3 === "string"){queryX.property_type = tempArr3} else {queryX.property_type = {"$in" : tempArr3 } }}
    //     if (!datasReceived.range == "") {let tempArr = datasReceived.range.split(","); queryX.price = { $gte: Decimal128(String(tempArr[0])), $lte: Decimal128(String(tempArr[1])) }}
    //     if (datasReceived.scoreDown == "" && !datasReceived.scoreUp == "" ) { let temp_str = "review_scores.review_scores_rating"; queryX[temp_str] = { $lte: Number(datasReceived.scoreUp) }}
    //     else if (!datasReceived.scoreDown == "" && datasReceived.scoreUp == "") { let temp_str = "review_scores.review_scores_rating"; queryX[temp_str] = { $gte: Number(datasReceived.scoreDown) }}
    //     else if (!datasReceived.scoreDown == "" && !datasReceived.scoreUp == "") { let temp_str = "review_scores.review_scores_rating"; queryX[temp_str] = { $lte: Number(datasReceived.scoreUp) , $gte: Number(datasReceived.scoreDown) }}
    //     else if (datasReceived.scoreDown == "" && datasReceived.scoreUp == "" && datasReceived.scoreOnly == "true") { let temp_str = "review_scores.review_scores_rating"; queryX[temp_str] = { $gt:0  }}

    //     console.log(queryX)

    // /// options strings
    //     let optionsX = {}; 

    //     let tempArr2 = datasReceived.sortX.split(",");
    //     if (!tempArr2[0] == "") {optionsX.sort = {[tempArr2[0]] : tempArr2[1]} };
    //     optionsX.projection= { name: 1, price: 1, property_type: 1, 'review_scores.review_scores_rating': 1, 'images.picture_url' : 1 };

    //     if (Number(datasReceived.limit) >=21 || Number(datasReceived.limit) <= 2) {optionsX.limit = 20}
    //     else if (Number(datasReceived.limit) >2 && Number(datasReceived.limit) < 21) {optionsX.limit = Number(datasReceived.limit)}
    //     else {optionsX.limit = 20}

    //     if (!datasReceived.page == "") {optionsX.skip = ((datasReceived.page - 1) * optionsX.limit)}

    // console.log(optionsX)


    //     try {
    //         await client.connect();
    //         const dataDBX = await collections.find(queryX, optionsX).toArray();
    //         const countNumber = await collections.countDocuments(queryX)
    //         const typesOfProperty = await collections.distinct("property_type")
    // //      const pricesDBX = await collections.find(queryX, {"projection" : { price: 1 }}).toArray(); 
    // //      let arrForPrices = []; await pricesDBX.map(item=>{arrForPrices.push(Number(item.price.toString()))});
    // //      let minAndMaxRange = [Math.min(...arrForPrices) , Math.max(...arrForPrices)]    

    //         const dataToSend = {
    //             number: countNumber,
    //             data: dataDBX,
    //             lists : typesOfProperty
    //  //           priceRange : minAndMaxRange
    //         }
    //         await res.json(dataToSend);
    //         // await console.log(dataToSend)

    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // });




})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})