
interface Props{
    linkPass: string,
    textPass:string
}

function TextLink({linkPass,textPass}:Props) {
    return (
        <>
            <a href={linkPass}>
                {textPass}
            </a>
        </>
    )
}

export default TextLink;