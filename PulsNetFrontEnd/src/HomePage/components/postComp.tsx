import { useState,useRef } from "react"
import { Toast } from 'bootstrap';
import UserPost from "../../api/userPost";

const showToast = (message: string) => {
    const toastElement = document.getElementById('liveToast') as HTMLElement;
    const toast = new Toast(toastElement);
    const toastBody = document.querySelector('.toast-body') as HTMLElement;

    toastBody.textContent = message;
    toast.show();
};



function PostComp() {
    var [postcaption, setPostCaption] = useState("")
    var [postImage, setPostImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    

    function clickSend() {
        const userLog = localStorage.getItem("userId")
        if (postcaption.trim() == "") {
            showToast("Invalid Post")
        }
        else {
            const formData = new FormData();
            if (postImage) {
                formData.append("imageUrl", postImage);
            }
            else {
                formData.append("imageUrl", "");
            }
            if (userLog) {
                formData.append("userId", userLog);
            }
            else {
                formData.append("userId", "");
            }
            formData.append("caption", postcaption);
            console.log(formData.get("caption"))
            console.log(formData.get("imageUrl"))
            console.log(formData.get("userId"))

            UserPost(formData)

            
        }
    }
    function handleclickimage() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setPostImage(e.target.files[0]);
        }
    }

    function presentImage() {
        if (postImage) {
            return<div className="pathcont">
            <div className="linkImg">
                {postImage.name }
            </div>
                <img src="images/Trash.png" className="trashPost" onClick={function (e: React.MouseEvent<HTMLImageElement>) {
                    setPostImage(null)
                }}></img>
        </div>
        }
    }

    console.log(postcaption)
    console.log(postImage)
    return <>
        <div className="postCont">
            <div className="topCont">
                <img className="userProf" src="images/userhold.png"></img>
                <input type="text" placeholder="post here ..." className="postInp" onChange={function (e: React.ChangeEvent<HTMLInputElement>) {
                    setPostCaption(e.target.value)
                }}></input>
            </div>
            <div className="botCont">
                {presentImage()}
                <img src="images/postimage.png" className="postImage" onClick={handleclickimage}></img>
                <img src="images/sendPost.png" className="sendPost" onClick={clickSend}></img>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{"display":"none"}}></input>
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