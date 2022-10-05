import React from "react";

export async function locationFetch(x) {
          
    let tempData = [];
    let tempData2 = [];
    const tempQuery = '/locationSearch?' + new URLSearchParams(x).toString()
    // console.log(tempQuery);
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };
    // if (!props.searchLocationX.address == "") {
        await fetch(tempQuery, requestOptions)
            .then(response => response.json())
            .then((value) => {
                value.suburbs.map((i) => { tempData.push(i) }); 
                value.cities.map((x) => { tempData2.push(x) }); 
            });
        // await console.log(tempData)
        const dataToFront = {
            suburbs : tempData,
            cities : tempData2 
        }
    // }
return dataToFront ;
    }



    export async function nameFetch(x) {
          
        let tempData = [];
        let tempData2 = [];
        const tempQuery = '/nameSearch?' + new URLSearchParams(x).toString()
        // console.log(tempQuery);
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        };
        // if (!props.searchLocationX.address == "") {
            await fetch(tempQuery, requestOptions)
                .then(response => response.json())
                .then((value) => { value.map((i) => { tempData.push(i) })});
            // await console.log(tempData)
    //         const dataToFront = {
    //             suburbs : tempData,
    //             cities : tempData2 
    //         }
    //     // }
    return tempData ;
        }    
