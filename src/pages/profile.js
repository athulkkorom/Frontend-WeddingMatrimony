import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '@/styles/Profile.module.css'
import NavBar from '../components/NavBar'
import { useRouter } from 'next/router'


const Profile = () => {
  const navigate = useRouter();
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [place,setPlace] = useState("")
  const handleLogout = () => {
    localStorage.clear();
    navigate.push("/login");
  };

  const handleHome = () =>{
    navigate.push("/mainpage")
  };
  const editProfile = ()=>{
    navigate.push("/editprofile")
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log(userId)
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${userId}`)
      .then(response => {
        setFullName(response.data.fullName);
        setProfileImage(response.data.profileImage);
        console.log(response.data.profileImage)
        setAge(response.data.age)
        setPlace(response.data.place)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.background}>
      <div>
      <NavBar />
      <div className={styles.profile}>
      <div className="card d-flex justify-content-cente" style={{ width: "18rem" }}>
  <img src={profileImage} className="card_img_top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{fullName}</h5>
    <p className="card-text">
    {age},
    {place}
    </p>
    <a onClick={editProfile} className="btn btn-primary">
      Edit profile
    </a>
  </div>
</div>
     
      </div>
      </div>
    </div>
  );
};

export default Profile;
