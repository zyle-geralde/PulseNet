import axios from "axios"
import { useState } from "react"
import '../styles/homepagestyle.css'
import HeadComp from "../components/headNav"


function AllPost() {
    return <div className="allPageCont">
        {/* header component */}
        <HeadComp />

        <div className="postCont">
            <div className="topCont">
                <img className="userProf" src="images/userhold.png"></img>
                <input type="text" placeholder="post here ..."></input>
            </div>
        </div>
    </div>
}

export default AllPost