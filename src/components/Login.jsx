import React, { useState } from "react";
import '../styles/Auth.css'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { auth } from '../firebase/firebase'; 


const MySwal = withReactContent(Swal);

const Login = () => {
  const navigate = useNavigate()

  const [ isLoading, setIsLoading ] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    //const user = userCredential.user;
    //console.log(user)
    setIsLoading(false)
    MySwal.fire({
      title: "Welcome!",
      text: "welcome to EcommerceApp",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/')
  })
  .catch((error) => {
    MySwal.fire({
      title: 'Oops...',
      text: error.message,
      icon: "error",
      confirmButtonText: "Ok",
    })
    setIsLoading(false)
    reset()
  });

    e.target.reset();
  };
  


  return (
    <>
    {isLoading && <h1>Cargando... </h1>}     
    <section className="login__container">
      <div className="login__checkin">
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <p className="login__form-title">Login</p>
          <input
            type="text"
            placeholder="user@gmail.com"
            autoComplete="off"
            {...register("email", {
              required: {
                value: true,
                message: "The email input is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "The format is not correct",
              },
            })}
          />
          {errors.email && (
            <span className="login__form-input-error">
              {errors.email.message}
            </span>
          )}

          <input
            type="password"
            placeholder="******"
            autoComplete="off"
            {...register("password", {
              required: {
                value: true,
                message: "The password input is required",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}/,
                message: "The format is not correct",
              },
            })}
          />
          {errors.password && (
            <span className="login__form-input-error">
              {errors.password.message}
            </span>
          )}

{/*           <label className="login__form-label-role">
            Role:
            <select id="role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>  */}

          <button className="login__user-btn">Login</button>
          <Link to="/reset" className="login__form-forgotPswd">
            <p>Forgot Password</p>
          </Link>
          <p className="login__register-text">
            Don't have an account?{" "}
            <span>
              <Link to="/register" className="login__register-link">
                Register
              </Link>
            </span>
          </p>
        </form>
      </div>
    </section>
    </>
  );
};

export default Login;
