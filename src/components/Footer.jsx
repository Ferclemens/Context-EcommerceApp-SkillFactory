import React from 'react'
import '../styles/Footer.css'

function Footer() {
  return (
    <div className='footer__container'>
      <div className='footer__container-title'>
          <h3 className='footer__linkedin-title'>Project Team</h3>
      </div>
          <li className='footer__linkedin-item'>
            <a href='https://www.linkedin.com/in/ezequiel-rango/' target='_blank' className='footer__linkedin-me'>Eze Rango</a>
          </li>
          <li className='footer__linkedin-item'>
            <a href="https://www.linkedin.com/in/foclemens/" target='_blank' className='footer__linkedin-me'>Fer Clemens</a>
          </li>
          <li className='footer__linkedin-item'>
            <a href='https://www.linkedin.com/in/herrerogonzalo/' target='_blank' className='footer__linkedin-me'>Gonza Herrero</a>
          </li>
          <li className='footer__linkedin-item'>
            <a href='https://www.linkedin.com/in/sebadalessandro/' target='_blank' className='footer__linkedin-me'>Seba D'Alessandro</a>
          </li>
      <div className='footer__container-avalith'>
        <a href='https://www.avalith.net/' target='_blank' className='footer__avalith-title'><h1>AVALITH<span className='footer__avalith-point'>.</span></h1></a>
      </div>
    </div>
  )
}

export default Footer