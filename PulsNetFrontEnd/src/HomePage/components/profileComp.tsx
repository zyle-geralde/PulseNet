import { useState, useRef } from "react";
import GetLoggedUser from "../../api/getUserLogged";
import { useEffect } from "react";


function ProfileComp() {
    var [profileInfo, setprofileInfo] = useState({"firstname":"",
        "lastname":"",
        "age":"",
        "gender":"",
        "address":"",
        "imageurl":"",})

    useEffect(() => {
        GetLoggedUser(setprofileInfo)
        console.log("Profile Info",profileInfo)
    }, []);

    return<div className="conatinProfileView">
    <div style={{"display":"flex","flexDirection":"row","justifyContent":"center"}}>
        <div className="profilePicChanges">
            <img src={profileInfo["imageurl"]} className="holdepProfileView"></img>
            <img src={'images/ediIcon.png'} className="holdEditprofileView"></img>
        </div>
    </div>
    <div style={{"display":"flex","flexDirection":"column","wordBreak":"break-word","marginTop":"20px","fontSize":"15px"}}>
        <div style={{"marginBottom":"10px"}}>
                <strong>First Name: </strong><span>{profileInfo.firstname}</span>
        </div>
        <div style={{"marginBottom":"10px"}}>
                <strong>Last Name: </strong><span>{profileInfo.lastname}</span>
        </div>
        <div style={{"marginBottom":"10px"}}>
                <strong>Age: </strong><span> {profileInfo.age}</span>
        </div>
        <div style={{"marginBottom":"10px"}}>
                <strong>Gender: </strong><span>{profileInfo.gender}</span>
        </div>
        <div style={{"marginBottom":"10px"}}>
                <strong>Address: </strong><span>{profileInfo.address}</span>
        </div>
    </div>
</div>
}

export default ProfileComp