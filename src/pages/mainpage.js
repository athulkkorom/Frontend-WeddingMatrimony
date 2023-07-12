import axios from "axios";
import { useState,useEffect } from "react";
import styles from '@/styles/Main.module.css';
import { useRouter } from "next/router";
import NavBar from "../components/NavBar"

const Mainpage = () => {
  const navigate = useRouter();
  const [users, setUsers] = useState([]);
  const handleLogout = () => {
    localStorage.clear();
    navigate.push("/login");
  };
  const handleProfile =() =>{
    navigate.push("/profile")
  };
  useEffect(()=>{
  axios
  .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/users`)
  .then((response) => {
    setUsers(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
}, []);

    return (
      <div className={styles.main}>
       <NavBar />
    <div className={styles.user}>
    {users.map((user) => (
  <div key={user.id}>
      <img src={user.profileImage} alt={user.fullName} />
    <h3>{user.fullName}</h3>
    <p>{user.place}, {user.age}</p>
  </div>
))}
</div>   
 </div>
    
      );
}
 
export default Mainpage;