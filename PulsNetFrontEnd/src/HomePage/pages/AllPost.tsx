import axios, { all } from "axios"
import { useState, useRef } from "react"
import '../styles/homepagestyle.css'
import HeadComp from "../components/headNav"
import PostComp from "../components/postComp"
import getAllPostApi from "../../api/getAllpost"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import deletePostfunc from "../../api/deletePostapi"
import { Toast } from "bootstrap"
import EditPostApi from "../../api/editPostapi"
import GetCommentsApi from "../../api/getCommentsapi"
import CreateCommentApi from "../../api/createCommentapi"
import DeleteCommentApi from "../../api/deleteCommentApi"
import Modal from "bootstrap"
import EditCommentApi from "../../api/editCommentApi"
import ChangeLikeApi from "../../api/changeLikeApi"
import getUserPostApi from "../../api/getPostUserApi"
import ProfileComp from "../components/profileComp"
import OtherProfileComp from "../components/otherProfileComp"

function likeactive(likepost: string, postId: string, userId: string) {
    if (likepost == "True") {
        return <div className="likeimgcont" onClick={function (e) {
            ChangeLikeApi(postId, userId)
        }}>
            <img src="images/thumbsUp.png" className="thumbsUpcls"></img>
        </div>
    }
    else {
        return <div className="likeimgconttwo" onClick={function (e) {
            ChangeLikeApi(postId, userId)
        }}>
            <img src="images/thumbsUp.png" className="thumbsUpcls"></img>
        </div>
    }
}

function AllPost() {
    var [otherUserId, setotherUserId] = useState("")
    
    var [allPost, setAllPost] = useState([{
        'fullname': 'default', 'dateCreated': 'default', 'caption': 'default',
        'imageurl': 'images/userhold.png', 'liked': 'False', 'countLike': "0", 'userPosted': '0',
        'profimage': 'images/userhold.png', 'postId': "0"
    }])

    var [allComments, setAllComments] = useState([])

    var [forEditImage, setForEditImage] = useState<string | null>(null)
    var [postImage, setPostImage] = useState<File | null>(null);
    var [forEditCaption, setForEditCaption] = useState("")
    var [forPostId, setForPostId] = useState("")

    var [commentMessage, setCommentMessage] = useState("")
    var [postIdcomment, setPostIdComment] = useState("")


    var [commentEdit, setCommentEdit] = useState("")

    const location = useLocation();


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
            console.log("foreditimage", forEditImage)
            console.log("postImage", postImage)
            console.log("caption", forEditCaption)
            console.log("postId", forPostId)
            fileInputRef.current.click();
        }

    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setForEditImage(e.target.files[0].name);
            setPostImage(e.target.files[0])

            console.log("foreditimage", forEditImage)
            console.log("postImage", postImage)
        }
    }

    function showImage(urlshow: string | null) {
        console.log(urlshow == null)
        if (urlshow) {
            return <div className="postImgCont">
                <img src={urlshow} className="ImgHolder"></img>
            </div>
        }
        return null
    }

    function showDeleteEdit(userId: string, postId: string, imgUrl: string, captionEdit: string) {
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

    function showdelEditforComment(userId: string, commentId: string, message: string) {
        if (localStorage.getItem("userId") == userId) {
            return <div className="deleteEdit" style={{ "marginTop": "10px" }}>
                <img src="images/Trash.png" className="uderIc" style={{ "height": "15px", "width": "15px" }} onClick={function (e) {
                    DeleteCommentApi(commentId)
                }}></img>
                <div className="btn-group dropend" >
                    <img src="images/ediIcon.png" className="uderIc dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ "height": "15px", "width": "15px" }} onClick={function (e) {
                        setCommentEdit(message)
                    }}></img>
                    <ul className="dropdown-menu" style={{ "padding": "10px" }}>
                        <li><textarea className="editPostcaption" style={{ "height": "100px" }} value={commentEdit} onChange={function (e) {
                            setCommentEdit(e.target.value)
                            console.log(commentEdit)
                        }}></textarea></li>
                        <li>
                            <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "end", "alignItems": "center" }}>
                                <img src="images/sendPost.png" className="sendPost" style={{ "height": "15px", "width": "15px" }} onClick={function (e) {
                                    if (commentEdit.trim() == "") {
                                        alert("Invalid credentials")
                                    }
                                    else {
                                        EditCommentApi(commentId, commentEdit)
                                    }
                                }}></img>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        }
        return null
    }

    function showProfile() {
        if (location.pathname == "/userpost") {
            return <ProfileComp/>
        }
        else if (location.pathname == "/otheruser") {
            return <OtherProfileComp userId={localStorage.getItem("othersId")+""} />
        }
        else if(location.pathname === "/allpost") {
            return <div style={{"marginTop":"80px"}}>
                
            </div>
        }
    }


    var userId = localStorage.getItem("userId")
    useEffect(() => {
        if (userId) {
            console.log("get all post")
            if (location.pathname === "/userpost") {
                localStorage.setItem("othersId", "")
                getUserPostApi(userId, setAllPost)
            }
            else if (location.pathname === "/otheruser") {
                if (localStorage.getItem("othersId") == "") {
                    window.location.href = "/allpost"
                }
                else {
                    getUserPostApi(localStorage.getItem("othersId")+"", setAllPost)
                }
            }
            else if (location.pathname === "/allpost") {
                localStorage.setItem("othersId", "")
                getAllPostApi(userId, setAllPost);
            }
        }
        else {
            window.location.href = ".."
        }
    }, [userId]);

    useEffect(() => {
        console.log("Route changed to:", location.pathname);

        if (location.pathname === "/userpost") {
            localStorage.setItem("othersId", "")
            getUserPostApi(userId + "", setAllPost)
        }
        else if (location.pathname === "/otheruser") {
            if (localStorage.getItem("othersId") == "") {
                window.location.href = "/allpost"
            }
            else {
                getUserPostApi(localStorage.getItem("othersId")+"", setAllPost)
            }
        }
        else if (location.pathname === "/allpost") {
            localStorage.setItem("othersId", "")
            getAllPostApi(userId + "", setAllPost);
        }
    }, [location]);

    return <div className="allPageCont">
        {/* header component */}
        <HeadComp />
        {showProfile()}
        <PostComp />

        {allPost.map((post, index) => (
            <div className="allPostCont">
                <div className="allProfCont">
                    <img src={post.profimage} className="userProfhold"></img>
                    <div className="namePost" style={{"cursor":"pointer"}} onClick={async function (e) {
                        localStorage.setItem("othersId", post.userPosted+"")
                        if (localStorage.getItem("othersId") === localStorage.getItem("userId")) {
                            window.location.href = "/userpost"
                        }
                        else {
                            window.location.href = "/otheruser"
                        }
                        console.log(otherUserId)
                    }}>
                        <div className="username">
                            {post.fullname}
                        </div>
                        <div className="postdate">
                            {post.dateCreated}
                        </div>
                    </div>
                    {showDeleteEdit(post.userPosted, post.postId, post.imageurl, post.caption)}
                </div>
                <div className="postContext">
                    {post.caption}
                </div>
                {showImage(post.imageurl)}
                <div className="likeComment">
                    <div className="likeContclass">
                        {likeactive(post.liked, post.postId + "", localStorage.getItem("userId") + "")}
                        <div className="countLike">{post.countLike}</div>
                    </div>
                    <div className="commentContclass" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={async function (e) {
                        setPostIdComment(post.postId)
                        await GetCommentsApi(post.postId + "", setAllComments)
                    }} >
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
                            {allComments.map((comment, index) => (
                                <div className="IndivComment">
                                    <img src={comment["userImage"]} className="commentUserimg"></img>
                                    <div className="usercommentTextCont">
                                        <div className="uppercomment">
                                            <div className="userCommentName">
                                                {comment["fullname"]}
                                            </div>
                                            <div className="userCommentdiv">
                                                {comment["message"]}
                                            </div>
                                            {showdelEditforComment(comment["userId"], comment["id"], comment["message"])}
                                        </div>
                                        <div className="dateCommented">{comment["dateCreated"]}</div>

                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="commentsendCont">
                            <input type="text" placeholder="type here " className="commentInp" onChange={function (e) {
                                setCommentMessage(e.target.value)
                            }}></input>
                            <img src="images/sendPost.png" className="commentSend" onClick={function (e) {
                                if (commentMessage.trim() == "") {
                                    alert("invalid credentials")
                                    return
                                }
                                else {
                                    CreateCommentApi(localStorage.getItem("userId") + "", postIdcomment + "", commentMessage)
                                }
                            }}></img>
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
                                }}></img> : null}
                        </span></div>
                        <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" }}>
                            <div className="AddPhotoEdit" onClick={handleclickimage}>Add Image</div>
                            <img src="images/sendPost.png" className="sendPost" onClick={clickSend}></img>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ "display": "none" }}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div className="modal fade" id="editCommentModal" aria-labelledby="exampleCommentModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleCommentModalLabel">EditComment</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={
                            function (e: React.MouseEvent<HTMLButtonElement>) {
                            }}></button>
                    </div>
                    <div className="modal-body">
                        <textarea className="editPostcaption" value={"sample"} onChange={function (e) {
                        }}></textarea>
                        <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "end", "alignItems": "center" }}>
                            <img src="images/sendPost.png" className="sendPost" onClick={function (e) {
                            }}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AllPost