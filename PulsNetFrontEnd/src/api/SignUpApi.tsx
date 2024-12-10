import axios from "axios";


async function SignUpApi(firstname: string, lastname: string, age: string, gender: string, address: string, email: string, password: string) {
    async function fetchCsrfToken() {
        const response = await fetch(' http://localhost:8000/csrf-token/', {
            method: 'GET',
            credentials: 'include', 
        });
        const data = await response.json();
        console.log('CSRF Token:', data.csrftoken);
        return data.csrftoken;
    }

    if (firstname == "" || lastname == "" || age == "" || gender == "" || address == "" || email == "" || password == "") {
        alert("Invalid Credentials")
    }
    else {
        const data = {
            "firstname": firstname,
            "lastname": lastname,
            "age": age,
            "gender": gender,
            "email": email,
            "password": password,
            "address":address
        }

        try {
            const csrfToken = await fetchCsrfToken();
            const response = await axios.post(" http://localhost:8000/api/signup/", data,  {
                headers: {
                  'X-CSRFToken': csrfToken,
                },
                withCredentials: true,
              })
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default SignUpApi