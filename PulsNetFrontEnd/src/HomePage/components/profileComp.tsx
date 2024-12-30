import { useState, useRef } from "react";
import GetLoggedUser from "../../api/getUserLogged";
import { useEffect } from "react";
import ChangeProfileImage from "../../api/changeProfileImage";
import EditUserProfileApi from "../../api/editUserProfileApi";


function ProfileComp() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    var [profileInfo, setprofileInfo] = useState({"firstname":"",
        "lastname":"",
        "age":"",
        "gender":"",
        "address":"",
        "imageurl": "",
    })
    
    var [forfirstname, setforfirstname] = useState("")
    var [forlastname, setforlastname] = useState("")
    var [forgender, setforgender] = useState("")
    var [foraddress, setforaddress] = useState("")
    var [forage, setforage] = useState("")

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
        {<div className="AddPhotoEdit" style={{ "width": "50px" }} data-bs-toggle="modal" data-bs-target="#editProfileModal" onClick={function (e) {
            setforfirstname(profileInfo.firstname)
            setforlastname(profileInfo.lastname)
            setforage(profileInfo.age)
            setforgender(profileInfo.gender)
            setforaddress(profileInfo.address)
        }}>Edit</div>}
        

        <div className="modal fade" id="editProfileModal" aria-labelledby="exampleCommentModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleCommentModalLabel">Edit Profile</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={
                            function (e: React.MouseEvent<HTMLButtonElement>) {
                            }}></button>
                    </div>
                    <div className="modal-body">
                        <h6>First Name</h6>
                        <input type="text" style={{ "width": "100%", "borderStyle": "solid", "borderWidth": "1.5px", "borderColor": "lightgray", "padding": "10px", "borderRadius": "5px", "marginBottom": "10px" }}
                            value={forfirstname} onChange={function (e) {
                            setforfirstname(e.target.value)
                        }}></input>
                        <h6>Last Name</h6>
                        <input type="text" style={{ "width": "100%", "borderStyle": "solid", "borderWidth": "1.5px", "borderColor": "lightgray", "padding": "10px", "borderRadius": "5px", "marginBottom": "10px" }}
                            value={forlastname} onChange={function (e) {
                            setforlastname(e.target.value)
                        }}></input>
                        <h6>Age</h6>
                        <input type="text" style={{ "width": "100%", "borderStyle": "solid", "borderWidth": "1.5px", "borderColor": "lightgray", "padding": "10px", "borderRadius": "5px", "marginBottom": "10px" }}
                            value={forage} onChange={function (e) {
                            setforage(e.target.value)
                        }}></input>
                        <h6>Gender</h6>
                        <input type="text" style={{ "width": "100%", "borderStyle": "solid", "borderWidth": "1.5px", "borderColor": "lightgray", "padding": "10px", "borderRadius": "5px", "marginBottom": "10px" }}
                            value={forgender} onChange={function (e) {
                            setforgender(e.target.value)
                        }}></input>
                        <h6>Address</h6>
                        <input type="text" style={{ "width": "100%", "borderStyle": "solid", "borderWidth": "1.5px", "borderColor": "lightgray", "padding": "10px", "borderRadius": "5px", "marginBottom": "10px" }}
                            value={foraddress} onChange={function (e) {
                            setforaddress(e.target.value)
                        }}></input>
                        <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "end", "alignItems": "center" }}>
                            <img src="images/sendPost.png" className="sendPost" onClick={function (e) {
                                if (forfirstname.trim() == "" || forlastname.trim() == "" || forage.trim() == "" || forgender.trim() == "" ||
                                    foraddress.trim() == "") {
                                    alert("Invalid Credentails")
                                }
                                else {
                                    EditUserProfileApi(forfirstname,forlastname,forage,forgender,foraddress)
                                }
                            }}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
}

export default ProfileComp