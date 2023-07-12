import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from '@/styles/EditProfile.module.css'
import NavBar from "@/components/NavBar";
import { toast,Toaster } from "react-hot-toast";

// import { useStorageUpload} from '@thirdweb-dev/react'
import { ThirdwebStorage} from '@thirdweb-dev/storage'

const Editprofile = () => {
  const navigate = useRouter()
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [place, setPlace] = useState("")
    const [image, setImage] = useState("")
    const [loading ,setLoading ] = useState(false)
    // const { mutate:upload } = useStorageUpload()
    const storage = new ThirdwebStorage()

    const handleLogout = () => {
      localStorage.clear();
      navigate.push("/login");
    };
  
    const handleHome = () =>{
      navigate.push("/Mainpage");
    };
  const updateName = async () => {
    setLoading(true)
    const userId = localStorage.getItem('userId');
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${userId}`, { fullName: name })
      .then(response => {
        console.log(response.data.fullName)
        setName(response.data.fullName);
      })
      .catch(error => {
        console.log(error);
      });
      setLoading(false)

  };
  const updateAge = async () => {
    setLoading(true)

    const userId = localStorage.getItem('userId');
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${userId}`, { age: age })
      .then(response => {
        console.log(response.data.age)
        setAge(response.data.age);
      })
      .catch(error => {
        console.log(error);
      });
      setLoading(false)

  };
  const updatePlace = async () => {
    const userId = localStorage.getItem('userId');
    setLoading(true)

    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${userId}`, { place: place })
      .then(response => {
        console.log(response.data.place)
        setPlace(response.data.place);
      })
      .catch(error => {
        console.log(error);
      });
      setLoading(false)

  };
  const updateImage = async (e) => {
    e.preventDefault();
    setLoading(true)

    // const formData = new FormData()
    // formData.append('image',image)
    let uploaded
    try {
       uploaded = await storage.upload(image,{uploadWithGatewayUrl:true,uploadWithoutDirectory:true})
       if(uploaded){
        const userId = localStorage.getItem('userId')

     await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${userId}`,{
      profileImage:uploaded
     })
      .then(response => {
        
        setImage(response.data.profileImage);
      })
      .catch(error => {
        console.log(error);
      });
      setLoading(false)
       }
       else {
        toast.error("upload failed!!")

       }
    } catch (error) {
      toast.error("upload failed!!")
    }
    

  };
    return ( 
      <div className="background">
        <NavBar />
        <div className="container">
            <h1>Profile Edit</h1>
            <div className="input">
        <input value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
        <button onClick={updateName} class="btn btn-info">Update</button>
        </div>
        <div className="input">
        <input value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
        <button onClick={updateAge} class="btn btn-info">Update</button>
        </div>
        <div className="input">
        <input value={place} placeholder="Place" onChange={(e) => setPlace(e.target.value)}/>
        <button onClick={updatePlace} class="btn btn-info">Update</button>
        </div>
        <div className="input">
        <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
        <button onClick={updateImage} class="btn btn-info">{loading?"uploading":'Update Image'}</button>
        </div>
        </div>
        <Toaster />
        </div>
     );
}
 
export default Editprofile;