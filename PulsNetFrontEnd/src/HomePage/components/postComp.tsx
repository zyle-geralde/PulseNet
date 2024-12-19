

function PostComp() {
    return <>
        <div className="postCont">
            <div className="topCont">
                <img className="userProf" src="images/userhold.png"></img>
                <input type="text" placeholder="post here ..." className="postInp"></input>
            </div>
            <div className="botCont">
                <div className="pathcont">
                    <div className="linkImg">
                        hello.pnglsnf
                    </div>
                    <img src = "images/Trash.png" className="trashPost"></img>
                </div>
                <img src="images/postimage.png" className="postImage"></img>
                <img src="images/sendPost.png" className="sendPost"></img>
            </div>
        </div>
    </>
}

export default PostComp