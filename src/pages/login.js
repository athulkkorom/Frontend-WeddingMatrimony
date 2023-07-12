
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import styles from '@/styles/Login.module.css';
import { useRouter } from "next/router";

const Login = () => {
    const navigate = useRouter();
     const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) =>{
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/login`, data)
    .then(response => {
      console.log(response.data.user._id);
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("userId", response.data.user._id)
      toast.success("User loggedin");
      navigate.push("/mainpage")
    })
    .catch(error => {
      console.log(error.response.data);
      toast.error(" failled")
    });
}

    return (  
        <div className={styles.my_component1}>
        <div className="container">
            <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      {...register("email", { required: true})} 
    />
    <div id="emailHelp" className="form-text">
      We'll never share your email with anyone else.
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      {...register("password", { required: true})} 
    />
  </div>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>
</div>
</div>
    );
}
 
export default Login ;