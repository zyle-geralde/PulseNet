import '../styles/loginstyle.css'

interface Props{
    textPass: string
    classPass: string
    clickFunc: () => void
}

function ButtonComp({textPass,classPass,clickFunc}:Props) {
    return (
        <>
            <div className={classPass} onClick={function (e) {
                clickFunc();
            }}>
                {textPass}
            </div>
        </>
    )
}


export default ButtonComp