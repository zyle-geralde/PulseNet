import axios from "axios"
import { useState } from "react"
import '../styles/homepagestyle.css'
import HeadComp from "../components/headNav"
import PostComp from "../components/postComp"
import getAllPostApi from "../../api/getAllpost"
import { useEffect } from "react"
import deletePostfunc from "../../api/deletePostapi"


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

    var [forEditImage,setForEditImage] = useState("")

    function showImage(urlshow: string | null) {
        console.log(urlshow == null)
        if (urlshow) {
            return<div className="postImgCont">
                <img src={urlshow} className="ImgHolder"></img>
            </div>
        }
        return null
    }

    function showDeleteEdit(userId:string, postId:string, imgUrl:string) {
        if (localStorage.getItem("userId") == userId) {
            return <div className="deleteEdit">
            <img src="images/Trash.png" className="uderIc" onClick={function (e) {
                deletePostfunc(postId)
            }}></img>
                <img src="images/ediIcon.png" className="uderIc" data-bs-toggle="modal" data-bs-target="#editModal" onClick={function (e) {
                    setForEditImage(imgUrl)
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
                    {showDeleteEdit(post.userPosted, post.postId,post.imageurl)}
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
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <textarea className="editPostcaption"></textarea>
                        <div className="photolinkedit">{forEditImage}<span>
                            {forEditImage != null?<img src="images/Trash.png" className="uderIc"></img>:null }
                        </span></div>
                        <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-between","alignItems":"center"}}>
                            <div className="AddPhotoEdit">Add Image</div>
                            <img src="images/sendPost.png" className="sendPost"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AllPost