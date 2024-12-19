import axios from "axios"
import { useState } from "react"
import '../styles/homepagestyle.css'


function AllPost() {
    return <div className="allPageCont">
        {/* header component */}
        <div className="headNav">
            <div className="Logo">
                <div style={{ fontSize: "30px", fontFamily: "'Pacifico', serif", color: "rgb(238, 27, 91)", textAlign: "center", marginLeft:"30px"}}>Pnet</div>
            </div>
            <div className="iconList">
                <img src="/images/home.png" className="homeImg"></img>
                <img src="/images/user.png" className="userImg"></img>
                <img src="/images/friends.png" className="friendImg"></img>
            </div>
            <div className="searchPeople">
                <input type="text" placeholder="search" className="searchInp"></input>
                <img src="/images/searchlogo.png" className="searchImg"></img>
            </div>
        </div>
    </div>
}

export default AllPost