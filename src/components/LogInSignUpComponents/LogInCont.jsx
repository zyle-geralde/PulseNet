import "../../styles/logInContstyle.css"

function LogInCont() {
    return (
        <div className="contLog">
            <h1 className="webTitle"><span className = "pulseText">Pulse</span>Net</h1>
            <div className="inputGroup">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="xxx"></input>
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control passwordInput" id="floatingInput2" placeholder="xxx"></input>
                    <label htmlFor="floatingInput2">Password</label>
                </div>
            </div>
            <div className = "logButCont">
                <button className = "btn btn-danger logBut">Log In</button>
            </div>
            <p className = "signMessage">Don't have an account? <span><a href="./SignUp" className = "signLink">Sign Up</a></span></p>
        </div>
    )
}

export default LogInCont