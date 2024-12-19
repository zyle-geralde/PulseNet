import axios from "axios"
import { useState } from "react"
import '../styles/homepagestyle.css'
import HeadComp from "../components/headNav"
import PostComp from "../components/postComp"


function AllPost() {
    return <div className="allPageCont">
        {/* header component */}
        <HeadComp />
        <PostComp />

        <div className="allPostCont">
            <div className="allProfCont">
                <img src="images/userhold.png" className="userProfhold"></img>
                <div className="namePost">
                    <div className="username">
                        thomas doe eddison saldnfjk
                    </div>
                    <div className="postdate">
                        July 10, 2023 jasdnfkjsnafkjnsdakj
                    </div>
                </div>
            </div>
            <div className="postContext">
                kjsadnfkjsanfkjsndfjknsadkjfnsakjfnsakjnfjaskdnfkjnasfdkjnsakdjfnaskjdfnksajndfkjsandfkjnsafkjansdjkfnasdkjfn
            </div>
            <div className="postImgCont">
                <img src="images/social-media-5187243_1920.png" className="ImgHolder"></img>
            </div>
            <div className="likeComment">
                <div className="likeContclass">
                    <div className="likeimgcont">
                        <img src="images/thumbsUp.png" className="thumbsUpcls"></img>
                    </div>
                    <div className="countLike">2</div>
                </div>
                <div className="commentContclass">
                    <img src="images/commentIcon.png" className="commentcls"></img>
                    <div className="commentlabel" data-bs-toggle="modal" data-bs-target="#exampleModal">Comment</div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Comments</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="commentsContain">

                        </div>
                        <div className="commentsendCont">
                            <input type="text" placeholder="type here " className="commentInp"></input>
                            <img src = "images/sendPost.png"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AllPost