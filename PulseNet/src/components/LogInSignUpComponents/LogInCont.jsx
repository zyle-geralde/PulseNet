import axios from "axios";
import "../../styles/logInContstyle.css"
import { useState } from "react";

function LogInCont() {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const logInFunction = async function (e) {
        e.preventDefault()
        setLoading(true)

        const data = {email,password}
        try{
            $response = await axios.post('http://localhost:8000/api/login',data);
            setResponse($response);
        }
        catch(error){
            setResponse(null)
        }
        finally{
            setLoading(false);
            setResponse('')
            setPassword('')
        }

    }
    return (
        <div className="contLog">
            <h1 className="webTitle"><span className="pulseText">Pulse</span>Net</h1>
            <form className="logInForm" onSubmit={logInFunction}>
                <div className="inputGroup">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="xxx"></input>
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control passwordInput" id="floatingInput2" placeholder="xxx"></input>
                        <label htmlFor="floatingInput2">Password</label>
                    </div>
                </div>
                <div className="logButCont">
                    <button type="submit" className="btn btn-danger logBut">Log In</button>
                </div>
            </form>
            <p className="signMessage">Don't have an account? <span><a href="./signUp" className="signLink">Sign Up</a></span></p>
        </div>
    )
}

export default LogInCont