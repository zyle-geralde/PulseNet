import axios from 'axios';
import Cookies from 'js-cookie';
import fetchCsrfToken from './csrftokenapi';

async function LogInApi(email:string,password:string) {
    const data = {
        'email': email,
        'password':password
    }

    try {
        // Step 1: Fetch CSRF token
        await fetchCsrfToken();

        // Step 2: Retrieve CSRF token from cookies
        const csrfToken = Cookies.get("csrftoken");
        if (!csrfToken) {
            console.error("CSRF token not found. Aborting request.");
            return;
        }
        else {
            console.log(csrfToken)
        }

        // Step 3: Make POST request with CSRF token
        const response = await axios.post(
            "http://127.0.0.1:8000/api/sampledata/",
            data,
            {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        console.log("Success:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error during login:", error);
        throw error; // Optionally re-throw for higher-level handling
    }

}
function helloworld() {
    console.log("Hello world")
}

export default {LogInApi,helloworld}