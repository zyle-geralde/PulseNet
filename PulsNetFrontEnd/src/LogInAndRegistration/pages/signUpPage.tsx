import ButtonComp from "../components/buttonComp";
import HeadComp from "../components/headComp";
import InputForm from "../components/Inputform";
import TextLink from "../components/textLink";
import { useState } from "react";
import SignUpApi from "../../api/SignUpApi";
import { Toast } from 'bootstrap';
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const navigate = useNavigate();
    var [firstname, setFirstname] = useState("")
    var [lastname, setLastname] = useState("")
    var [age, setAge] = useState("")
    var [gender, setGender] = useState("")
    var [address, setAddress] = useState("")
    var [email, setEmail] = useState("")
    var [password, setPassword] = useState("")
    function firstnamefunc(val: string) {
        setFirstname(val)
    }
    function lastnamefunc(val: string) {
        setLastname(val)
    }
    function agefunc(val: string) {
        setAge(val)
    }
    function genderfunc(val: string) {
        setGender(val)
    }
    function addressfunc(val: string) {
        setAddress(val)
    }
    function emailfunc(val: string) {
        setEmail(val)
    }
    function passwordfunc(val: string) {
        setPassword(val)
    }
    function singUpcall() {
        SignUpApi(firstname, lastname, age, gender, address, email, password,navigate)

    }

    return (
        <>
            <div style={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "50px",
                marginTop: "50px"
            }}>
                <HeadComp heading="Sign Up" />
                <div className="formDiv">

                    <InputForm typePass="text" idPass="floatingFirstName" placeholderPass="FirstName" forContent="FirstName" clickHandle={firstnamefunc} />
                    <InputForm typePass="text" idPass="floatingLastName" placeholderPass="LastName" forContent="LastName" clickHandle={lastnamefunc} />
                    <InputForm typePass="number" idPass="floatingAge" placeholderPass="Age" forContent="Age" clickHandle={agefunc} />
                    <InputForm typePass="text" idPass="floatingGender" placeholderPass="Gender" forContent="Gender" clickHandle={genderfunc} />
                    <InputForm typePass="text" idPass="floatingAddress" placeholderPass="Address" forContent="Address" clickHandle={addressfunc} />
                    <InputForm typePass="email" idPass="floatingInput" placeholderPass="xxx@xxx.com" forContent="Email address" clickHandle={emailfunc} />
                    <InputForm typePass="password" idPass="floatingPassword" placeholderPass="Password" forContent="Password" clickHandle={passwordfunc} />
                    <TextLink linkPass=".." textPass="Already have an Account? Log In" classPass="logInLink" />
                    <ButtonComp textPass="Sign Up" classPass="signUpButton" clickFunc={singUpcall} />
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

export default SignUpPage