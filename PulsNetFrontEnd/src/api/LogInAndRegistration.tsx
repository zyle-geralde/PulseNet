import axios from 'axios';

function LogInApi(name:string,password:string) {
    const data = {
        'name': name,
        'password':password
    }

    axios.post("http://127.0.0.1:8000/api/sampledata/", data)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.error('Error:', error);
        })

}
function helloworld() {
    console.log("Hello world")
}

export default {LogInApi,helloworld}