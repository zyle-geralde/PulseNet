import HeadComp from "../components/headComp";
import InputForm from "../components/Inputform";
import TextLink from "../components/textLink";

function LogInPage() {
    return (
        <>
            <HeadComp heading="LOG IN" />
            <div>
                <InputForm typePass="email" idPass="floatingInput" placeholderPass="xxx@xxx.com" forContent="Email address" />
                <InputForm typePass="password" idPass="floatingPassword" placeholderPass="Password" forContent="Password" />
                <TextLink linkPass="" textPass="Don't have an account? Sign Up now"/>
            </div>
        </>
    )
}

export default LogInPage;