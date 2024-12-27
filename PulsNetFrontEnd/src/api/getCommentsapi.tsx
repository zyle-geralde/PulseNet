import axios from 'axios';
import Cookies from 'js-cookie';
import fetchCsrfToken from './csrftokenapi';
import NewAccessToken from './newAccessToken';
import { Dispatch, SetStateAction } from 'react';

async function GetCommentsApi(postId:string, setAllComments:Dispatch<SetStateAction<never[]>>) {
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

    const response = await axios.post('http://localhost:8000/api/getComments/', { postId: postId },
        {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
    )

    console.log("result ",response.data.result)
    setAllComments(response.data.result)
}


export default GetCommentsApi