import { useEffect } from "react";
import "../../styles/logInContstyle.css"
import { useState } from "react";
import axios from 'axios';

function SignInCont() {
    const [email, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const signUpBut = async function (e) {
        const data = {name, email, password}

        await axios.post('http://localhost:8000/api/register', data)
            .then(function (response) {
                setResponse(response.message)
                setError(null);
            })
            .catch(function (error) {
                setError(error)
                setResponse(null)
            })
            .finally(function () {
                setLoading(false)
            })

    }

    return (
        <div className="contLog">
            <h1 className="webTitle">Register</h1>
            <div className="inputGroup">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="xxx" onChange={(e)=>{
                        setUserName(e.target.value)
                    }}></input>
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput3" placeholder="xxx" onChange={(e)=>{
                        setName(e.target.value)
                    }}></input>
                    <label htmlFor="floatingInput3">FullName</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control passwordInput" id="floatingInput2" placeholder="xxx"  onChange={(e)=>{
                        setPassword(e.target.value)
                    }}></input>
                    <label htmlFor="floatingInput2">Password</label>
                </div>
            </div>
            <div className="logButCont">
                <button className="btn btn-danger logBut" onClick={signUpBut}>Sign Up</button>
            </div>
            <p className="signMessage">Already have an account? <span><a href="./LogIn" className="signLink">Log In</a></span></p>
        </div>
    )
}
export default SignInCont