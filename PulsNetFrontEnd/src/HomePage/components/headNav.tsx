import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Cookies from 'js-cookie';
import fetchCsrfToken from '../../api/csrftokenapi'
import NewAccessToken from '../../api/newAccessToken';
import { Dispatch, SetStateAction } from 'react';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function HeadComp() {
    const navigate = useNavigate()
    var [changeHome, setChangeHome] = useState("")
    var [changeUserPost,setchangeUserPost] = useState("")

    const location = useLocation();

    useEffect(() => {
        console.log("Route changed to:", location.pathname);

        if (location.pathname === "/userpost") {
            setChangeHome("homeImg")
            setchangeUserPost("userImg2")
        }
        else if (location.pathname === "/allpost") {
            setChangeHome("homeImg2")
            setchangeUserPost("userImg")
        }
        else {
            setChangeHome("homeImg")
            setchangeUserPost("userImg")
        }
    }, [location]);

    var [classChange, setClassChange] = useState("dropSearchClickHide")
    var [allsearched, setallsearched] = useState([])
    
    var [wordsearch,setwordsearch] = useState("")
    
    async function getALlUsersApi() {
        await fetchCsrfToken();

        const access_token = localStorage.getItem("accessToken")
        const refresh_token = localStorage.getItem("refreshToken")
    
        const csrfToken = Cookies.get("csrftoken");
        if (!csrfToken) {
            console.error("CSRF token not found. Aborting request.");
            return;
        }
        else {
            console.log("CSRFTOKEN", csrfToken)
            console.log(localStorage)
        }

        const response = await axios.post(
            'http://localhost:8000/api/getAllUsers/', {word:wordsearch},
            {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )
    
        console.log(response.data.jsondata)
        if (response.data.message == "Successful") {
            setallsearched(response.data.jsondata)
        }
        if (response.data.message == "Expired access token") {
            console.log("expired")
            NewAccessToken()
            return
        }
        else if (response.data.message == "Invalid") {
            console.log("Invalid")
            window.location.href = ".."
            return
        }
    }

    return <>
        <div className="headNav">
            <div className="Logo">
                <div className="pulsenet">Pnet</div>
            </div>
            <div className="iconList">
                <img src="/images/home.png" className={changeHome} onClick={function (e) {
                    navigate("/allpost")
                }}></img>
                <img src="/images/user.png" className={changeUserPost} onClick={function (e) {
                    navigate("/userpost")
                }}></img>
            </div>
            <div className="searchPeople">
                <input type="text" placeholder="search" value={wordsearch} className="searchInp" onChange={function (e) {
                    setwordsearch(e.target.value)
                }}></input>
                <img src="/images/searchlogo.png" className="searchImg" style={{ "cursor": "pointer" }} onClick={function (e) {
                    if (classChange == "dropSearchClickHide") {
                        setClassChange("dropSearchClick")
                        getALlUsersApi()
                    }
                    else {
                        setClassChange("dropSearchClickHide")
                        setallsearched([])
                    }
                    
                }}></img>
                <img src={"/images/logout.png"} className="friendImg" style={{ "cursor": "pointer","marginLeft":"-7px"}} onClick={function (e) {
                    window.location.href = "/"
                    localStorage.clear()
                }}></img>
            </div>
            <div className={classChange}>
                {allsearched.map((names,index) => (
                    <div className="storeUsername" onClick={
                        function (e) {
                            localStorage.setItem("othersId", names["userId"]+"")
                            if (localStorage.getItem("othersId") === localStorage.getItem("userId")) {
                                window.location.href = "/userpost"
                            }
                            else {
                                window.location.href = "/otheruser"
                            }
                        }
                    }>{ names["fullname"]}</div>
                ))}
            </div>
        </div>
    </>
}
export default HeadComp