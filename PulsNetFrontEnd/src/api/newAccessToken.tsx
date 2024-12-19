import axios,{ AxiosError } from "axios";


async function NewAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
        const response = await axios.post("http://localhost:8000/api/token/refresh/", {
            refresh: refreshToken,
        });
        localStorage.setItem("accessToken", response.data.access);
        console.log("Access token refreshed!", localStorage);
    }  catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            if (axiosError.response.status === 401) {
                console.error("Refresh token has expired. Logging out the user.");

                localStorage.clear()
                window.location.href = ".."
            } else {
                console.error("Error while refreshing the token:", axiosError.response.data);
            }
        } else {
            console.error("Network or server error:", axiosError.message);
        }
    }
}


export default NewAccessToken