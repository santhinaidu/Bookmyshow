import React, { useState } from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
function Navbar(){
    const[seachTerm,setSearchTerm] = useState("")
    const handleSearch = (searchTerm)=>{
        console.log("search team:",searchTerm);
        setSearchTerm(seachTerm);
    }
    return(<div>

        <div className="navbar">
            <div className="img">
           <Link to="/"><img src="https://th.bing.com/th/id/OIP.1A_Q-t3n01xiS-W1UsnveQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3" alt="" width={"150px"} height={"50px"} /></Link> 
            </div>
        
            <SearchBar onSearch = {handleSearch}/>
             <div className="nav-list">
                <ul className="nav-list1">
                    <li>Movies</li>
                    <li>Stream</li>
                    <li>Events</li>
                    <li>Plays</li>
                    <li>Sports</li>
                </ul>
             </div>
             <div className="nav-login">
             <button > <Link to="/login"> Login</Link></button>
             </div>
        </div>
    </div>)
}
export default Navbar;