
interface Props{
    linkPass: string,
    textPass: string,
    classPass: string
}

function TextLink({linkPass,textPass,classPass}:Props) {
    return (
        <>
            <a href={linkPass} className={classPass}>
                {textPass}
            </a>
        </>
    )
}

export default TextLink;