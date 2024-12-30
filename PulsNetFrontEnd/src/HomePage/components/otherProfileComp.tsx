import { useState, useRef } from "react";
import GetOtherUserProfile from "../../api/getOtherUserProfile";
import { useEffect } from "react";
interface Props {
    userId: string
}

function OtherProfileComp({ userId }: Props) {
    var [profileInfo, setprofileInfo] = useState({
        "firstname": "",
        "lastname": "",
        "age": "",
        "gender": "",
        "address": "",
        "imageurl": "",
    })

    useEffect(() => {
        GetOtherUserProfile(userId,setprofileInfo)
        console.log("Profile Info", profileInfo)
    }, []);


    return <div className="conatinProfileView">
        <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "center" }}>
            <div className="profilePicChanges">
                <img src={profileInfo["imageurl"]} className="holdepProfileView"></img>
            </div>
        </div>
        <div style={{ "display": "flex", "flexDirection": "column", "wordBreak": "break-word", "marginTop": "20px", "fontSize": "15px" }}>
            <div style={{ "marginBottom": "10px" }}>
                <strong>First Name: </strong><span>{profileInfo.firstname}</span>
            </div>
            <div style={{ "marginBottom": "10px" }}>
                <strong>Last Name: </strong><span>{profileInfo.lastname}</span>
            </div>
            <div style={{ "marginBottom": "10px" }}>
                <strong>Age: </strong><span> {profileInfo.age}</span>
            </div>
            <div style={{ "marginBottom": "10px" }}>
                <strong>Gender: </strong><span>{profileInfo.gender}</span>
            </div>
            <div style={{ "marginBottom": "10px" }}>
                <strong>Address: </strong><span>{profileInfo.address}</span>
            </div>
        </div>
    </div>
}

export default OtherProfileComp