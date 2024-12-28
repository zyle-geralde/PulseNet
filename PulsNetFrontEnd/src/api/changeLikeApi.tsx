import axios from "axios";
import fetchCsrfToken from "./csrftokenapi";
import Cookies from 'js-cookie';
import NewAccessToken from "./newAccessToken";

async function ChangeLikeApi(postId:string,userId:string) {
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

    var data = {
        postId: postId,
        userId:userId
    }
    const response = await axios.post('http://localhost:8000/api/changeLike/', data,
        {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                'X-CSRFToken': csrfToken,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    )

    if (response.data.message == "Successful") {
        window.location.reload()
    }
    else if (response.data.message == "Expired access token") {
        console.log("expired")
        NewAccessToken()
        return
    }
    else if (response.data.message == "Invalid") {
        console.log("Invalid")
        window.location.href = ".."
        return
    }
    console.log(response.data)
}

export default ChangeLikeApi