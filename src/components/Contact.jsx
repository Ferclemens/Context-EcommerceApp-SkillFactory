import React from "react";
import "../styles/Contact.css";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";



const MySwal = withReactContent(Swal);


const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = (data, e) => {

    emailjs.sendForm('service_vuf8zra', 'template_8z89ild', e.target, 'xFa04mzHu00vjn8BZ')
      .then((result) => {
          //console.log(result.text);
          MySwal.fire({
            title: "Success!",
            text: "The message has been sent successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/')
      }, (error) => {
        MySwal.fire({
            title: 'Oops...',
            text: error.message,
            icon: "error",
            confirmButtonText: "Ok",
          })
      });
  ;

    // limpiar campos
    e.target.reset();
  };

  return (
    <section className="form">
      <div className="form__titulo">
        <p className="form__titulo-detalle">Complete the following form.</p>
      </div>

      <form className="form__container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input-section">
          <label>
            <h2 className="form__input-title">Name: </h2>
          </label>
          <input
            name="name"
            id="name"
            className="form__input-name"
            type="text"
            placeholder="Max 30 letters"
            autoComplete="off"
            {...register("name", {
              required: {
                value: true,
                message: "The name input is required",
              },
              maxLength: {
                value: 30,
                message: "Enter maximum 30 letters",
              },
            })}
          />
        </div>
        {errors.name && (
          <span className="form__input-error">{errors.name.message}</span>
        )}

        <div className="form__input-section">
          <label>
            <h2 className="form__input-title">Email: </h2>
          </label>
          <input
            name="email"
            id="inputEmail"
            className="form__input-email"
            type="email"
            placeholder="***@***.***"
            autoComplete="off"
            {...register("mail", {
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
        </div>
        {errors.mail && (
          <span className="form__input-error">{errors.mail.message}</span>
        )}

        <div className="form__textarea-section">
          <textarea
            name="message"
            id="formMensaggeId"
            className="form__textarea-menssage"
            rows="7"
            placeholder="Enter your message"
            {...register("message", {
              required: "The message textarea is required",
            })}
          />
        </div>
        {errors.message && (
          <span className="form__input-error">{errors.message.message}</span>
        )}

        <button type="submit" id="button" value="Send Email">send</button>
      </form>
    </section>
  );
};

export default Contact;
