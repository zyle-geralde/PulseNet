
interface Props{
    textPass:string
}

function ButtonComp({textPass}:Props) {
    return (
        <>
            <div>
                {textPass}
            </div>
        </>
    )
}


export default ButtonComp