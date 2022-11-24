import React, { useState } from 'react'
import '../styles/Register.css'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import Loading from './Loading'


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
          text: 'Los passwords no coinciden',
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
            title: "Bienvenido!",
            text: "Su usuario se creo correctamente.",
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
        navigate('/')
      }
      e.target.reset()
    }

  return (
    <>  
        {isLoading && <Loading />}   
        <section className='register__container'>
            <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
            <p className="register__form-title">Registro</p>
            <label className='title__input'>Nombre</label>
            <input
                className='inputRegister'
                type="text"
                placeholder='Nombre'
                autoComplete="off"
                {...register('name',{
                required:{
                    value: true,
                    message:'El campo nombre es requerido'
                },
            })}
            />
            {errors.name && <span className="alert__mesaje">{errors.name.message}</span>}

            <label className='title__input'>Email</label>
            <input
                className='inputRegister'
                type="text"
                placeholder='user@mail.com'
                autoComplete="off"
                {...register('email',{
                required:{
                    value: true,
                    message:'El campo email es requerido'
                },
                pattern:{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "El formato no es correcto"
                }
            })}
            />
            {errors.email && <span className="alert__mesaje">{errors.email.message}</span>}

            <label className='title__input'>Password</label>
            <input
                className='inputRegister'
                type="Password"
                placeholder='******'
                autoComplete="off"
                {...register('password',{
                required:{
                    value: true,
                    message:'El campo password es requerido'
                },
                pattern:{
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}/,
                    message: "El formato no es correcto"
                }
            })}
            />
            {errors.password && <span className="alert__mesaje">{errors.password.message}</span>}

            <label className='title__input'>Confirmar Password</label>
            <input
                className='inputRegister'
                type="Re ingresar password"
                placeholder='******'
                autoComplete="off"
                {...register('confirmPassword',{
                required:{
                    value: true,
                    message:'El campo password es requerido'
                },
                pattern:{
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}/,
                    message: "El formato no es correcto"
                }
            })}
            />
            {errors.confirmPassword && <span className="alert__mesaje">{errors.confirmPassword.message}</span>}

            <p className='login__form-password'>Mínimo 6 y máximo 15 caracteres, al menos: una letra mayúscula y una minúscula, un número y un carácter especial</p>

            <button className='login__user-btn'>Registrarse</button>
            <p className='login__register-text'>Ya tienes una cuenta? <span><Link to='/login' className='link'>Ingresar</Link></span></p>
            </form>
        </section>
    </>
  )
}

export default Register