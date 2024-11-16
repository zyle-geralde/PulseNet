import '../styles/loginstyle.css'
interface Props{
    textPass: string
    classPass:string
}

function ButtonComp({textPass,classPass}:Props) {
    return (
        <>
            <div className={classPass}>
                {textPass}
            </div>
        </>
    )
}


export default ButtonComp