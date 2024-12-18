import axios from "axios";
import { Toast } from "bootstrap";

async function fetchCsrfToken() {
    const response = await fetch(' http://localhost:8000/csrf-token/', {
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    console.log('CSRF Token:', data.csrftoken);
    return data.csrftoken;
}
const showToast = (message: string) => {
    const toastElement = document.getElementById('liveToast') as HTMLElement;
    const toast = new Toast(toastElement);
    const toastBody = document.querySelector('.toast-body') as HTMLElement;

    toastBody.textContent = message;
    toast.show();
};

async function SignUpApi(firstname: string, lastname: string, age: string, gender: string, address: string, email: string, password: string,navigate: (path: string) => void ) {

    if (firstname == "" || lastname == "" || age == "" || gender == "" || address == "" || email == "" || password == "") {
        showToast("Invalid Credentials")
    }
    else {
        const data = {
            "firstname": firstname,
            "lastname": lastname,
            "age": age,
            "gender": gender,
            "email": email,
            "password": password,
            "address": address
        }

        try {
            const csrfToken = await fetchCsrfToken();
            const response = await axios.post(" http://localhost:8000/api/signup/", data, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                withCredentials: true,
            })
            if (response.data.message == "Successfully created User") {
                navigate("..")
            }
            showToast(response.data.message)
        }
        catch (error) {
            alert(error)
        }
    }
}

export default SignUpApi