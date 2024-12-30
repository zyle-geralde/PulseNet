import { useState } from "react"
import { useNavigate } from "react-router-dom"

function HeadComp() {
    const navigate = useNavigate()

    var [classChange,setClassChange] = useState("dropSearchClickHide")

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
                <img src="/images/searchlogo.png" className="searchImg" style={{ "cursor": "pointer" }} onClick={function (e) {
                    if (classChange == "dropSearchClickHide") {
                        setClassChange("dropSearchClick")
                    }
                    else {
                        setClassChange("dropSearchClickHide")
                    }
                    
                }}></img>
            </div>
            <div className={classChange}>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
                <div>Hellow</div>
            </div>
        </div>
    </>
}
export default HeadComp