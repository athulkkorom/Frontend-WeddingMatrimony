
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import styles from '@/styles/Signup.module.css'
import { useRouter } from 'next/router'

const Signup = () => {
    const navigate = useRouter();
     const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) =>{console.log(data);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/signup`, data)
    .then(response => {
      console.log(response.data);
      toast.success("User registerd");
      navigate.push("/login")
    })
    .catch(error => {
      console.log(error.response.data);
      toast.error("User registration failled")
    });
}

    return (  
      <div className={styles.my_component2}>
      <div className="container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      fullName
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      {...register("fullName", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Place
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      {...register("place", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Age
    </label>
    <input
      type="number"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      {...register("age", { required: true})} 
    />
  </div>
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
 
export default Signup ;