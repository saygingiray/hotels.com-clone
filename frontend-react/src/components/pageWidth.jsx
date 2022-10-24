import React from "react";
import { useState, useEffect } from 'react';

export default function PageWidth(props){

const [width, setWidth]   = useState(window.innerWidth);
const [height, setHeight] = useState(window.innerHeight);
const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
}
useEffect(() => {
    window.addEventListener("resize", updateDimensions); props.sendData(width) ;
    return () => window.removeEventListener("resize", updateDimensions); 
}, [width]);

}