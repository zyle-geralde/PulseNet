import ButtonComp from "../components/buttonComp";
import HeadComp from "../components/headComp";
import InputForm from "../components/Inputform";
import TextLink from "../components/textLink";

function LogInPage() {
    return (
        <>
            <HeadComp heading="LOG IN" />
            <div className="formDiv">
                <InputForm typePass="email" idPass="floatingInput" placeholderPass="xxx@xxx.com" forContent="Email address" />
                <InputForm typePass="password" idPass="floatingPassword" placeholderPass="Password" forContent="Password" />
                <TextLink linkPass="" textPass="Don't have an account? Sign Up now" />
                <ButtonComp textPass="Log In" classPass="logInButton"/>
            </div>
        </>
    )
}

export default LogInPage;