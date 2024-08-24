import axios from "axios";
import "../../styles/logInContstyle.css"
import { useState } from "react";

function LogInCont() {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logInFunction = async function (e) {
        e.preventDefault()
        setLoading(true)

        if (!email || !password) {
            setLoading(false)
            return setResponse({ 'message': 'All fields required' })
        }

        const data = { email, password }
        try {
            const responseme = await axios.post('http://localhost:8000/api/loguser', data,{ withCredentials: true });
            setResponse(responseme.data);
        }
        catch (error) {
            setResponse(error.message)
            console.log(error.message)
        }
        finally {
            setLoading(false);
            setEmail('')
            setPassword('')
        }

    }

    const showLoad = function (e) {
        if (loading) {
            return <div>Loading...</div>
        }
        else {
            return <div>
                <form className="logInForm" onSubmit={logInFunction}>
                    <div className="inputGroup">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="xxx" onChange={function (e) {
                                setEmail(e.target.value)
                            }}></input>
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control passwordInput" id="floatingInput2" placeholder="xxx" onChange={function (e) {
                                setPassword(e.target.value)
                            }}></input>
                            <label htmlFor="floatingInput2">Password</label>
                        </div>
                        <div className="responseMessage">{response.message}</div>
                    </div>
                    <div className="logButCont">
                        <button type="submit" className="btn btn-danger logBut">Log In</button>
                    </div>
                </form>
                <p className="signMessage">Don't have an account? <span><a href="./signUp" className="signLink">Sign Up</a></span></p>
            </div>
        }
    }

    return (
        <div className="contLog">
            <h1 className="webTitle"><span className="pulseText">Pulse</span>Net</h1>
            {showLoad()}
        </div>
    )
}

export default LogInCont