import axios from 'axios';
import Cookies from 'js-cookie';
import fetchCsrfToken from './csrftokenapi';
import { Toast } from 'bootstrap';

const showToast = (message: string) => {
    const toastElement = document.getElementById('liveToast') as HTMLElement;
    const toast = new Toast(toastElement);
    const toastBody = document.querySelector('.toast-body') as HTMLElement;

    toastBody.textContent = message;
    toast.show();
};

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
            "http://localhost:8000/api/login/",
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
        showToast(response.data.message)

    } catch (error) {
        console.error("Error during login:", error);
        throw error; 
    }

}
function helloworld() {
    console.log("Hello world")
}

export default {LogInApi,helloworld}