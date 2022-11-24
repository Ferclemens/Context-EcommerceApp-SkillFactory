import React, { useState } from "react";
import '../styles/Login.css'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { auth } from '../firebase/firebase';
import Loading from './Loading'


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
      title: "Bienvenido!",
      text: "E-commerce App",
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
    {isLoading && <Loading />}     
    <section className="login__container">
      <div className="login__container__child">
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <p className="login__form-title">Ingresar</p>
          <input
            className="input__form"
            type="text"
            placeholder="user@gmail.com"
            autoComplete="off"
            {...register("email", {
              required: {
                value: true,
                message: "El campo email es requerido",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "El formato no es correcto",
              },
            })}
          />
          {errors.email && (
            <span className="alert__mesaje">
              {errors.email.message}
            </span>
          )}

          <input
            className="input__form"
            type="password"
            placeholder="******"
            autoComplete="off"
            {...register("password", {
              required: {
                value: true,
                message: "El campo password es requerido",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}/,
                message: "El formato no es correcto",
              },
            })}
          />
          {errors.password && (
            <span className="alert__mesaje">
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
          <div></div>
          <Link to="/reset" className="link">
            <p>Olvido su password?</p>
          </Link>
          <p>
            No tiene cuenta?{" "}
            <span>
              <Link to="/register" className="link">
                Registrarse
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
