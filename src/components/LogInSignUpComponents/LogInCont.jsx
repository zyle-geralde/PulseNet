import "../../styles/logInContstyle.css"

function LogInCont() {
    return (
        <div class="contLog">
            <h1 class="webTitle">PulseNet</h1>
            <div class="inputGroup">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="xxx"></input>
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control passwordInput" id="floatingInput2" placeholder="xxx"></input>
                    <label for="floatingInput2">Password</label>
                </div>
            </div>
            <div class = "logButCont">
                <button class = "btn btn-danger logBut">Log In</button>
            </div>
        </div>
    )
}

export default LogInCont