import '../styles/loginstyle.css'
interface Props{
    heading:string,
}

//Use PasalCasing when creating components
function HeadComp({heading}:Props) {
    return (
        <>
            <div className="headStyle">
                {heading}
            </div>
        </>
    )
}

export default HeadComp;