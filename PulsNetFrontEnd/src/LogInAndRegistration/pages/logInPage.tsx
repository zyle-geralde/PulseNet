import ButtonComp from "../components/buttonComp";
import HeadComp from "../components/headComp";
import InputForm from "../components/Inputform";
import TextLink from "../components/textLink";

function LogInPage() {

    return (
        <>
            <div className="LogInImage">
                
                <img src="./images/social-media-5187243_1920.png" style={{
                    width: "100%", borderRadius: "10px",
                    boxShadow: "10px 10px 10px rgb(225, 225, 225)",
                    marginTop: "30px",
                }}></img>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{ fontSize: "50px", fontFamily: "'Pacifico', serif", color: "rgb(238, 27, 91)", textAlign: "center", marginRight:"10px"}}>PULSENET</div>
                <HeadComp heading="LOG IN" />
                <div className="formDiv">
                    <InputForm typePass="email" idPass="floatingInput" placeholderPass="xxx@xxx.com" forContent="Email address" />
                    <InputForm typePass="password" idPass="floatingPassword" placeholderPass="Password" forContent="Password" />
                    <TextLink linkPass="/signUp" textPass="Don't have an account? Sign Up now" classPass="signUpLink" />
                    <ButtonComp textPass="Log In" classPass="logInButton" />
                </div>
            </div>
        </>
    )
}

export default LogInPage;