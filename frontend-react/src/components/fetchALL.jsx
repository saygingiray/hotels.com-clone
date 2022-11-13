import React from "react";

const requestOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
};

export async function locationFetch(x) {

    let tempData = [];
    let tempData2 = [];
    const tempQuery = '/locationSearch?' + new URLSearchParams(x).toString()
    // console.log(tempQuery);
   
    // if (!props.searchLocationX.address == "") {
    await fetch(tempQuery, requestOptions)
        .then(response => response.json())
        .then((value) => {
            value.suburbs.map((i) => { tempData.push(i) });
            value.cities.map((x) => { tempData2.push(x) });
        });
    // await console.log(tempData)
    const dataToFront = {
        suburbs: tempData,
        cities: tempData2
    }
    // }
    return dataToFront;
}



export async function nameFetch(x) {

    let tempData = [];
    let tempData2 = [];
    const tempQuery = '/nameSearch?' + new URLSearchParams(x).toString()
    // console.log(tempQuery);

    // if (!props.searchLocationX.address == "") {
    await fetch(tempQuery, requestOptions)
        .then(response => response.json())
        .then((value) => { value.map((i) => { tempData.push(i) }) });
    // await console.log(tempData)
    //         const dataToFront = {
    //             suburbs : tempData,
    //             cities : tempData2 
    //         }
    //     // }
    return tempData;
}    

export async function propertyListFetch() {

    let tempData = [];
    const tempQuery = '/propertyList' 
    // console.log(tempQuery);

    // if (!props.searchLocationX.address == "") {
    await fetch(tempQuery, requestOptions)
        .then(response => response.json())
        .then((value) => { value.map((i) => { tempData.push(i) }) });

    return tempData;
}    


export async function searchResultsFromServer(x) {
    let valueX = {};

    await fetch(x, requestOptions)
    .then(response => response.json())
    .then((value) => { valueX = value });

    return valueX;


}

export async function fetchHotelDetails(x) {
    // console.log(new URLSearchParams(x).toString())
    let valueHotel = {};
    let tempQuery = '/hotelDetails?' + new URLSearchParams(x).toString()

    await fetch(tempQuery, requestOptions)
    .then(response => response.json())
    .then((value) =>  { valueHotel = value });

    return valueHotel;

}


export async function fetchHotelReviews(x) {
    // console.log(new URLSearchParams(x).toString())
    let valueHotelReview = {};
    let tempQuery = '/hotelReviews?' + new URLSearchParams(x).toString()

    await fetch(tempQuery, requestOptions)
    .then(response => response.json())
    .then((value) =>  { valueHotelReview = value });
// console.log(valueHotelReview)
    return valueHotelReview;

}

export async function fetchSimilarHotel(x) {
    let tempData = {
        lat0: x[1]-0.4,
        lat1: x[1]+0.4,
        lng0: x[0]-0.4, 
        lng1: x[0]+0.4
    }    
    // console.log(tempData)
    let valueHotelReview = [];
// console.log(tempData)
    let tempQuery = '/similarHotels?' + new URLSearchParams(tempData).toString()

    await fetch(tempQuery, requestOptions)
    .then(response => response.json())
    .then((value) =>  { valueHotelReview = value });
// console.log(valueHotelReview)
//     return valueHotelReview;
return valueHotelReview;
}