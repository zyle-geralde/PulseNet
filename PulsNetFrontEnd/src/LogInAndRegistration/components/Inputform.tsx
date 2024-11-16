interface Props{
    typePass: string,
    idPass: string,
    placeholderPass: string
    forContent:string
}
function InputForm({typePass,idPass,placeholderPass,forContent}:Props) {
    return (
        <>
            <div className="form-floating mb-3 inputclass">
                <input type={typePass} className="form-control" id={idPass} placeholder={placeholderPass} />
                <label htmlFor="floatingInput">{forContent}</label>
            </div>
        </>
    )
}

export default InputForm;