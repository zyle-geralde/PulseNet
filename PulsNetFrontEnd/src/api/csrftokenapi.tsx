import axios from 'axios';
import Cookies from 'js-cookie';

// Fetch CSRF token
const fetchCsrfToken = async () => {
    const response = await axios.get('http://127.0.0.1:8000/csrf-token/', {
        withCredentials: true,  // Ensures cookies are sent
    });
    const csrfToken = response.data.csrftoken;
    Cookies.set('csrftoken', csrfToken);  // Save it in cookies
};

export default fetchCsrfToken