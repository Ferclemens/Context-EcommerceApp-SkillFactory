import React, { useState } from 'react'
import '../styles/Auth.css'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';


const MySwal = withReactContent(Swal);

const Register = () => {

    const [ isLoading, setIsLoading ] = useState(false)
  
    const navigate = useNavigate()
  
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
    const onSubmit = async(data, e)=>{
      //se debe agregar un componente exta a futuro para registros de Administrador. Este debe
      //generar la posibilidad de acceder a un perfil de Admin solo si paga
      const role = 'user'
      //setUser({...data,role})
      if(data.password !== data.confirmPassword){
        MySwal.fire({
          title: 'Oops...',
          text: 'Password do not match!',
          icon: "error",
          confirmButtonText: "Ok",
        })
      }else{
        setIsLoading(true)
        const result = await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential)=>{
          console.log('userCredential: ',userCredential.user)
          //const userFirebase = userCredential.user;
          setIsLoading(false)
          MySwal.fire({
            title: "Success!",
            text: "Your user was successfully registered",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        })
        return userCredential
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
        const userRef = doc(db, `users/${result.user.uid}`)
        setDoc(userRef,{...data, role})
        navigate('/login')
      }
      e.target.reset()
    }

  return (
    <>  
        {isLoading && <h1>Cargando...(agregar un spinner)</h1>}   
        <section className='login__container'>
        <div className='login__checkin'>
            <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
            <label className='login__input-title'>Name</label>
            <input
                type="text"
                placeholder='Name'
                autoComplete="off"
                {...register('name',{
                required:{
                    value: true,
                    message:'The name input is required'
                },
            })}
            />
            {errors.name && <span className="login__form-input-error">{errors.name.message}</span>}

            <label className='login__input-title'>Email</label>
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

            <label className='login__input-title'>Password</label>
            <input
                type="password"
                placeholder='******'
                autoComplete="off"
                {...register('password',{
                required:{
                    value: true,
                    message:'The password input is required'
                },
                pattern:{
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}/,
                    message: "The format is not correct"
                }
            })}
            />
            {errors.password && <span className="login__form-input-error">{errors.password.message}</span>}

            <label className='login__input-title'>Confirm Password</label>
            <input
                type="password"
                placeholder='******'
                autoComplete="off"
                {...register('confirmPassword',{
                required:{
                    value: true,
                    message:'The password input is required'
                },
                pattern:{
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}/,
                    message: "The format is not correct"
                }
            })}
            />
            {errors.confirmPassword && <span className="login__form-input-error">{errors.confirmPassword.message}</span>}

            <p className='login__form-password'>Min 6 and max 15 characters, at least: one uppercase and one lowercase letter, one number and one special character</p>

            <button className='login__user-btn'>Register</button>
            <p className='login__register-text'>Do you already have an account? <span><Link to='/login' className='login__register-link'>Login</Link></span></p>
            </form>
        </div>
        </section>
    </>
  )
}

export default Register