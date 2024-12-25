import axios from "axios";
import fetchCsrfToken from "./csrftokenapi";
import NewAccessToken from "./newAccessToken";
import Cookies from 'js-cookie';

async function deletePostfunc(postid: string) {
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


    var passData = {
        "postId":postid
    }
    const response = await axios.post('http://localhost:8000/api/deletePost/', passData,
        {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }
    )
    console.log(response)
}

export default deletePostfunc