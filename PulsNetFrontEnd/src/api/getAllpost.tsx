import axios from 'axios';
import Cookies from 'js-cookie';
import fetchCsrfToken from './csrftokenapi';
import NewAccessToken from './newAccessToken';


async function getAllPostApi(id:String) {

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
        userId: id,
    }
    const response = await axios.post(
        'http://localhost:8000/api/allpost/',
        data,
        {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
    )

    console.log(response.data)
    if (response.data.message == "Expired access token") {
        NewAccessToken()
        return
    }
    else if (response.data.message == "Invalid") {
        window.location.href = ".."
        return
    }


}

export default getAllPostApi