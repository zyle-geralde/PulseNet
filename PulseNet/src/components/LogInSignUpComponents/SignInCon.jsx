import { useEffect } from "react";
import "../../styles/logInContstyle.css"
import { useState } from "react";
import axios from 'axios';

function SignInCont() {
    const [email, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signUpBut = async function (e) {
        e.preventDefault(); 
        const data = { name, email, password }
        setLoading(true)

        if(!name || !email || !password){
            setLoading(false)
            return setResponse({"message":"All fields are required"})
        }
        try {
            const responseme = await axios.post('http://localhost:8000/api/register', data);
            setResponse(responseme.data)
            setError(null);

            if (responseme.data.message == "Data received successfully!") {
                { window.location.href = "/LogIn" }
            }
        } catch (error) {
            setError(error)
            setResponse(null)
        }
        finally {
            setLoading(false)
            setUserName('')
            setPassword('')
            setName('')
        }

    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="contLog">
            <h1 className="webTitle">Register</h1>
            <form className="signUpForm" onSubmit={signUpBut}>
                <div className="inputGroup">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="xxx" onChange={(e) => {
                            setUserName(e.target.value)
                        }}></input>
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput3" placeholder="xxx" onChange={(e) => {
                            setName(e.target.value)
                        }}></input>
                        <label htmlFor="floatingInput3">FullName</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control passwordInput" id="floatingInput2" placeholder="xxx" onChange={(e) => {
                            setPassword(e.target.value)
                        }}></input>
                        <label htmlFor="floatingInput2">Password</label>
                    </div>
                    <div className="responseMessage">{response.message}</div>
                </div>
                <div className="logButCont">
                    <button type="submit" className="btn btn-danger logBut">Sign Up</button>
                </div>
            </form>
            <p className="signMessage">Already have an account? <span><a href="./LogIn" className="signLink">Log In</a></span></p>
        </div>
    )
}
export default SignInCont