import ButtonComp from "../components/buttonComp";
import HeadComp from "../components/headComp";
import InputForm from "../components/Inputform";
import TextLink from "../components/textLink";
import '../styles/loginstyle.css'
import loginapi from "../../api/LogInAndRegistration";
import { useState } from "react";
import { Toast } from "bootstrap";

function LogInPage() {

    var [useremail, setUserEmail] = useState("")
    var [userpassword, setUserPassword] = useState("")

    function getEmail(value:string) {
        setUserEmail(value)
    }
    function getPassword(value:string) {
        setUserPassword(value)
    }

    function logInEmailPassword() {
        loginapi.helloworld()
        loginapi.LogInApi(useremail,userpassword)
    }
    
    return (
        <>
            <div className="LogInImage">
                <img src="./images/social-media-5187243_1920.png" style={{
                    width: "100%", borderRadius: "10px",
                    boxShadow: "10px 10px 10px rgb(225, 225, 225)",
                    marginTop: "30px",
                }}></img>
            </div>
            <div style={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "50px",
                marginTop:"50px"
            }}>
                <div style={{ fontSize: "50px", fontFamily: "'Pacifico', serif", color: "rgb(238, 27, 91)", textAlign: "center", marginRight:"10px"}}>PULSENET</div>
                <HeadComp heading="LOG IN" />
                <div className="formDiv">
                    <InputForm typePass="email" idPass="floatingInput" placeholderPass="xxx@xxx.com" forContent="Email address" clickHandle={getEmail} />
                    <InputForm typePass="password" idPass="floatingPassword" placeholderPass="Password" forContent="Password" clickHandle={getPassword}/>
                    <TextLink linkPass="/signUp" textPass="Don't have an account? Sign Up now" classPass="signUpLink" />
                    <ButtonComp textPass="Log In" classPass="logInButton" clickFunc={logInEmailPassword}/>
                </div>
            </div>

            <div className="position-fixed top-0 end-60 p-3" style={{ "zIndex": "11","maxWidth":"300px"}}>
                <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">PulseNet</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogInPage;