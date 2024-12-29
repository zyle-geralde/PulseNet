import { useState, useRef } from "react";
import GetLoggedUser from "../../api/getUserLogged";
import { useEffect } from "react";
import ChangeProfileImage from "../../api/changeProfileImage";


function ProfileComp() {
    const fileInputRef = useRef<HTMLInputElement>(null);
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

    function handleclickimage() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

    }

    
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            console.log("ChangeProf", e.target.files[0])
            const formData = new FormData();
            formData.append("imageUrl", e.target.files[0])
            formData.append("userId", localStorage.getItem("userId") + "");
            
            ChangeProfileImage(formData)
        }
        else {
            console.log("ChangeProf:NO")
        }
    }

    return<div className="conatinProfileView">
    <div style={{"display":"flex","flexDirection":"row","justifyContent":"center"}}>
        <div className="profilePicChanges">
            <img src={profileInfo["imageurl"]} className="holdepProfileView"></img>
            <img src={'images/ediIcon.png'} className="holdEditprofileView" onClick={handleclickimage}></img>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{"display":"none"}}></input>
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