import ButtonComp from "../components/buttonComp";
import HeadComp from "../components/headComp";
import InputForm from "../components/Inputform";
import TextLink from "../components/textLink";

function SignUpPage() {
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",marginBottom: "50px",
                marginTop:"50px"}}>
                <HeadComp heading="Sign Up" />
                <div className="formDiv">

                    <InputForm typePass="text" idPass="floatingFirstName" placeholderPass="FirstName" forContent="FirstName" />
                    <InputForm typePass="text" idPass="floatingLastName" placeholderPass="LastName" forContent="LastName" />
                    <InputForm typePass="text" idPass="floatingNickName" placeholderPass="NickName" forContent="NickName" />
                    <InputForm typePass="number" idPass="floatingAge" placeholderPass="Age" forContent="Age" />
                    <InputForm typePass="text" idPass="floatingGender" placeholderPass="Gender" forContent="Gender" />
                    <InputForm typePass="text" idPass="floatingAddress" placeholderPass="Address" forContent="Address" />
                    <InputForm typePass="email" idPass="floatingInput" placeholderPass="xxx@xxx.com" forContent="Email address" />
                    <InputForm typePass="password" idPass="floatingPassword" placeholderPass="Password" forContent="Password" />
                    <TextLink linkPass=".." textPass="Already have an Account? Log In" classPass="logInLink" />
                    <ButtonComp textPass="Sign Up" classPass="signUpButton" />
                </div>
            </div>
        </>
    )
}

export default SignUpPage