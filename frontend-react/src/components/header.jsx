import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Header() {



    const style = {

    }



    return (

        <div className="d-flex p-3 justify-content-center" style={{ "height": "70px", "backgroundColor": "white" }}>

            <div className="d-flex align-items-center" style={{ "width": "1200px" }}>
                <img src="https://www.hotels.com/_dms/header/logo.svg?locale=en_GB&siteid=310000033&2" style={{ "width": "164px", "height": "32px" }} ></img>
                <div className="m-5 pt-1">
                    <a href="#" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <span >More Travel <KeyboardArrowDownIcon /></span></a>
                    <ul className="dropdown-menu shadow animate__animated animate__fadeIn mt-2" aria-labelledby="dropdownMenuLink">
                        <div className="m-2" style={{ "width": "400px" }}>
                            <li className="p-3 drpdwn" ><a href="#">Groups & Meetings</a></li>
                            <li className="p-3 drpdwn"><a href="#">Hotels.com Rewards</a></li>
                        </div></ul>
                </div>
   


            </div>




        </div>


    )
}