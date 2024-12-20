import { useState } from "react"
import { Toast } from 'bootstrap';

const showToast = (message: string) => {
    const toastElement = document.getElementById('liveToast') as HTMLElement;
    const toast = new Toast(toastElement);
    const toastBody = document.querySelector('.toast-body') as HTMLElement;

    toastBody.textContent = message;
    toast.show();
};



function PostComp() {
    var [postcaption, setPostCaption] = useState("")

    function clickSend() {
        if (postcaption.trim() == "") {
            showToast("Invalid Post")
        }
    }

    console.log(postcaption)
    return <>
        <div className="postCont">
            <div className="topCont">
                <img className="userProf" src="images/userhold.png"></img>
                <input type="text" placeholder="post here ..." className="postInp" onChange={function (e: React.ChangeEvent<HTMLInputElement>) {
                    setPostCaption(e.target.value)
                }}></input>
            </div>
            <div className="botCont">
                <div className="pathcont">
                    <div className="linkImg">
                        hello.pnglsnf
                    </div>
                    <img src="images/Trash.png" className="trashPost"></img>
                </div>
                <img src="images/postimage.png" className="postImage"></img>
                <img src="images/sendPost.png" className="sendPost" onClick={clickSend}></img>
            </div>
            <div className="position-fixed top-0 end-60 p-3" style={{ "zIndex": "11", "maxWidth": "300px" }}>
                <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">PulseNet</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default PostComp