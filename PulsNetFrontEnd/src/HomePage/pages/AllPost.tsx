import axios from "axios"
import { useState,useRef } from "react"
import '../styles/homepagestyle.css'
import HeadComp from "../components/headNav"
import PostComp from "../components/postComp"
import getAllPostApi from "../../api/getAllpost"
import { useEffect } from "react"
import deletePostfunc from "../../api/deletePostapi"
import { Toast } from "bootstrap"
import EditPostApi from "../../api/editPostapi"

function likeactive(likepost: string) {
    if (likepost == "True") {
        return <div className="likeimgcont">
            <img src="images/thumbsUp.png" className="thumbsUpcls"></img>
        </div>
    }
    else {
        return <div className="likeimgconttwo">
            <img src="images/thumbsUp.png" className="thumbsUpcls"></img>
        </div>
    }
}

function AllPost() {
    var [allPost, setAllPost] = useState([{
        'fullname': 'default', 'dateCreated': 'default', 'caption': 'default',
        'imageurl': 'images/userhold.png', 'liked': 'False', 'countLike': "0", 'userPosted': '0',
        'profimage': 'images/userhold.png','postId':"0"
    }])

    var [forEditImage, setForEditImage] = useState<string | null>(null)
    var [postImage, setPostImage] = useState<File | null>(null);
    var [forEditCaption, setForEditCaption] = useState("")
    var [forPostId,setForPostId] = useState("")
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    function clickSend() {
        if (forEditCaption.trim() == "") {
            alert("Invalid Post")
        }
        else {
            const formData = new FormData();
            if (postImage) {
                formData.append("imageUrl", postImage);
            }
            else {
                formData.append("imageUrl", "");
            }
            formData.append("postId", forPostId);

            formData.append("caption", forEditCaption);

            if (forEditImage) {
                formData.append("indic", forEditImage);
            }
            else {
                formData.append("indic", "");
            }

            EditPostApi(formData)

            
        }
    }

    function handleclickimage() {
        if (fileInputRef.current) {
            console.log("foreditimage",forEditImage)
            console.log("postImage", postImage)
            console.log("caption", forEditCaption)
            console.log("postId",forPostId)
            fileInputRef.current.click();
        }

    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setForEditImage(e.target.files[0].name);
            setPostImage(e.target.files[0])

            console.log("foreditimage",forEditImage)
            console.log("postImage",postImage)
        }
    }

    function showImage(urlshow: string | null) {
        console.log(urlshow == null)
        if (urlshow) {
            return<div className="postImgCont">
                <img src={urlshow} className="ImgHolder"></img>
            </div>
        }
        return null
    }

    function showDeleteEdit(userId:string, postId:string, imgUrl:string, captionEdit:string) {
        if (localStorage.getItem("userId") == userId) {
            return <div className="deleteEdit">
            <img src="images/Trash.png" className="uderIc" onClick={function (e) {
                deletePostfunc(postId)
            }}></img>
                <img src="images/ediIcon.png" className="uderIc" data-bs-toggle="modal" data-bs-target="#editModal" onClick={function (e) {
                    setForEditImage(imgUrl)
                    setForEditCaption(captionEdit)
                    setForPostId(postId)
            }}></img>
        </div>
        }
        return null
    }
    

    var userId = localStorage.getItem("userId")
    useEffect(() => {
        if (userId) {
            getAllPostApi(userId, setAllPost);
        }
        else {
            window.location.href = ".."
        }
    }, [userId]);

    return <div className="allPageCont">
        {/* header component */}
        <HeadComp />
        <PostComp />

        {allPost.map((post, index) => (
            <div className="allPostCont">
                <div className="allProfCont">
                    <img src={post.profimage} className="userProfhold"></img>
                    <div className="namePost">
                        <div className="username">
                            {post.fullname}
                        </div>
                        <div className="postdate">
                            {post.dateCreated}
                        </div>
                    </div>
                    {showDeleteEdit(post.userPosted, post.postId,post.imageurl,post.caption)}
                </div>
                <div className="postContext">
                    {post.caption}
                </div>
                {showImage(post.imageurl)}
                <div className="likeComment">
                    <div className="likeContclass">
                        {likeactive(post.liked)}
                        <div className="countLike">{post.countLike}</div>
                    </div>
                    <div className="commentContclass" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img src="images/commentIcon.png" className="commentcls"></img>
                        <div className="commentlabel">Comment</div>
                    </div>
                </div>
            </div>
        ))}

        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Comments</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="commentsContain">
                            <div className="IndivComment">
                                <img src="images/userhold.png" className="commentUserimg"></img>
                                <div className="usercommentTextCont">
                                    <div className="uppercomment">
                                        <div className="userCommentName">
                                            john does asdnfslndfjsadnasdfasdfsafsdfaasdfasfsafasdfsadfasfsafsadf
                                        </div>
                                        <div className="userCommentdiv">
                                            sakjdfjkasdfkjasdfjkasdfkjsadkjfnsadjkfnaskjdfnjkasdnfkjdasnfkjsafdn
                                            asjkdfnjksanfdjkanfsjkasnfkjasndfksanjkfnksjanfjasf
                                            asdkfnsakjdfnskjadfnskjanfkjsandfkjsandkjfnsakdjfnaskjdf
                                            sakjdfjkasdfkjasdfjkasdfkjsadkjfnsadjkfnaskjdfnjkasdnfkjdasnfkjsafdn
                                            asjkdfnjksanfdjkanfsjkasnfkjasndfksanjkfnksjanfjasf
                                            asdkfnsakjdfnskjadfnskjanfkjsandfkjsandkjfnsakdjfnaskjdf
                                        </div>
                                    </div>
                                    <div className="dateCommented">July 6 2023</div>
                                </div>
                            </div>

                        </div>
                        <div className="commentsendCont">
                            <input type="text" placeholder="type here " className="commentInp"></input>
                            <img src="images/sendPost.png" className="commentSend"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="editModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">EditPost</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={
                                function (e: React.MouseEvent<HTMLButtonElement>) {
                                    setPostImage(null)
                                    setForEditImage(null)
                                    setForEditCaption("")
                                }}></button>
                    </div>
                    <div className="modal-body">
                        <textarea className="editPostcaption" value={forEditCaption} onChange={function (e) {
                            setForEditCaption(e.target.value)
                            console.log(forEditCaption)
                        }}></textarea>
                        <div className="photolinkedit">{forEditImage}<span>
                            {forEditImage != null ? <img src="images/Trash.png" className="uderIc" onClick={
                                function (e: React.MouseEvent<HTMLImageElement>) {
                                    setPostImage(null)
                                    setForEditImage(null)
                                }}></img>:null }
                        </span></div>
                        <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-between","alignItems":"center"}}>
                            <div className="AddPhotoEdit" onClick={handleclickimage}>Add Image</div>
                            <img src="images/sendPost.png" className="sendPost" onClick={clickSend}></img>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{"display":"none"}}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AllPost