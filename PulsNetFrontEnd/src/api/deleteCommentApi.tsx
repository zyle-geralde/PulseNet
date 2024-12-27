import axios from "axios";
import fetchCsrfToken from "./csrftokenapi";
import NewAccessToken from "./newAccessToken";
import Cookies from 'js-cookie';


async function DeleteCommentApi(commentId: string) {
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


    const response = await axios.post('http://localhost:8000/api/deleteComment/', { commentId: commentId },
        {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
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
}

export default DeleteCommentApi