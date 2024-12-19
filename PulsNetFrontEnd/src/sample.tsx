import axios from 'axios';
import Cookies from 'js-cookie';
import fetchCsrfToken from './api/csrftokenapi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewAccessToken from './api/newAccessToken';


async function sampleApi(navigate: (path: string) => void) {

    //Check cookies
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


    //Actual response code
    var data = {
        email: "This is an email",
        password: "This is a password"
    }
    const response = await axios.post(
        "http://localhost:8000/api/sampledata/",
        data,
        {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
    );

    //check if token is expired of invalid
    console.log(response.data)
    if (response.data.message == "Expired access token") {
        NewAccessToken()
        return
    }
    else if (response.data.message == "Invalid") {
        navigate("..")
        return
    }


    //Handle code here

}


function SamplePage() {
    const navigate = useNavigate()

    //runs once when the page load
    useEffect(() => {
        sampleApi(navigate);
    }, []); 
    return<>
        <div onClick={function (e) {
            sampleApi(navigate)
        }}>Sample</div>
    </>
}

export default SamplePage