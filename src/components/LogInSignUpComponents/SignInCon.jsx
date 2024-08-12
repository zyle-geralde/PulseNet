import "../../styles/logInContstyle.css"

function SignInCont(){
    return(
        <div className="contLog">
            <h1 className="webTitle">Register</h1>
            <div className="inputGroup">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="xxx"></input>
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput3" placeholder="xxx"></input>
                    <label htmlFor="floatingInput3">FullName</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control passwordInput" id="floatingInput2" placeholder="xxx"></input>
                    <label htmlFor="floatingInput2">Password</label>
                </div>
            </div>
            <div className = "logButCont">
                <button className = "btn btn-danger logBut">Sign Up</button>
            </div>
            <p className = "signMessage">Already have an account? <span><a href="./signUp" className = "signLink">Log In</a></span></p>
        </div>
    )
}
export default SignInCont