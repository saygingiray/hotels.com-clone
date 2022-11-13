import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, Outlet } from "react-router-dom"


export default function Header() {



    const style = {

    }



    return (

        <div className="d-flex justify-content-center" style={{ "height": "70px", "backgroundColor": "white" }}>

            <div className="d-flex  p-1 align-items-center" style={{ "width": "1200px" }}>
            <Link to={`/`}><img src="https://www.hotels.com/_dms/header/logo.svg?locale=en_GB&siteid=310000033&2" style={{ "width": "164px", "height": "32px" }} ></img></Link>
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