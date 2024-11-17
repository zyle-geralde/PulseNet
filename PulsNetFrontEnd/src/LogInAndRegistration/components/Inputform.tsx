import '../styles/loginstyle.css'
interface Props{
    typePass: string,
    idPass: string,
    placeholderPass: string
    forContent: string
    clickHandle:(value:string) => void
}
function InputForm({typePass,idPass,placeholderPass,forContent,clickHandle}:Props) {
    return (
        <>
            <div className="form-floating mb-3 inputclass">
                <input type={typePass} className="form-control" id={idPass} placeholder={placeholderPass} onChange={function (e) {
                    clickHandle(e.target.value)
                }}/>
                <label htmlFor="floatingInput">{forContent}</label>
            </div>
        </>
    )
}

export default InputForm;