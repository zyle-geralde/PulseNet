import axios from "axios"
import { useState } from "react"
import '../styles/homepagestyle.css'
import HeadComp from "../components/headNav"
import PostComp from "../components/postComp"
import getAllPostApi from "../../api/getAllpost"
import { useEffect } from "react"


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
        'profimage': 'images/userhold.png'
    }])

    var userId = localStorage.getItem("userId")
    useEffect(() => {
        if (userId) {
            getAllPostApi(userId, setAllPost);
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
                </div>
                <div className="postContext">
                    {post.caption}
                </div>
                <div className="postImgCont">
                    <img src={post.imageurl} className="ImgHolder"></img>
                </div>
                <div className="likeComment">
                    <div className="likeContclass">
                        {likeactive(post.liked)}
                        <div className="countLike">{post.countLike}</div>
                    </div>
                    <div className="commentContclass">
                        <img src="images/commentIcon.png" className="commentcls"></img>
                        <div className="commentlabel" data-bs-toggle="modal" data-bs-target="#exampleModal">Comment</div>
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
    </div>
}

export default AllPost