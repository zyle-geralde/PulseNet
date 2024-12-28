import { useNavigate } from "react-router-dom"

function HeadComp() {
    const navigate = useNavigate()

    return <>
        <div className="headNav">
            <div className="Logo">
                <div className="pulsenet">Pnet</div>
            </div>
            <div className="iconList">
                <img src="/images/home.png" className="homeImg" onClick={function (e) {
                    navigate("/allpost")
                }}></img>
                <img src="/images/user.png" className="userImg" onClick={function (e) {
                    navigate("/userpost")
                }}></img>
                <img src="/images/friends.png" className="friendImg"></img>
            </div>
            <div className="searchPeople">
                <input type="text" placeholder="search" className="searchInp"></input>
                <img src="/images/searchlogo.png" className="searchImg"></img>
            </div>
        </div>
    </>
}
export default HeadComp