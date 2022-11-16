import React, { useState } from 'react'
//import '../styles/Reset.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { auth } from '../firebase/firebase';
import Loading from './Loading'

const MySwal = withReactContent(Swal);

const Reset = () => {
  const navigate = useNavigate()

  const [ isLoading, setIsLoading ] = useState(false)

  const { register, handleSubmit, reset,formState: { errors } } = useForm();

  const onSubmit = (data, e)=>{
    //console.log('email: ',data.email)
    setIsLoading(true)
    sendPasswordResetEmail(auth, data.email)
  .then(() => {
    setIsLoading(false)
    MySwal.fire({
      title: "Send Email!",
      text: "Check your email!",
      icon: "success",
      confirmButtonText: "Ok",
    })
    navigate('/login')
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

    // limpiar campos
    e.target.reset();
  }

  return (
    <>
    {isLoading && <Loading />}     
    <section className='login__container'>
        <div className='login__checkin'>
          <p className='login__form-title'>Reset Password</p>
          <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder='user@gmail.com'
              autoComplete="off"
              {...register('email',{
                required:{
                    value: true,
                    message:'The email input is required'
                },
                pattern:{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "The format is not correct"
                }
            })}
            />
            {errors.email && <span className="login__form-input-error">{errors.email.message}</span>}

          <button className='login__user-btn'>Reset Password</button>

          </form>
          <p className='login__register-text'>Don't have an account? <span><Link to='/register' className='link'>Register</Link></span></p>
        </div>

    </section>
    </>
  )
}

export default Reset