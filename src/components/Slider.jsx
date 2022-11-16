import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import '../styles/Slider.css'
import img1 from '../assets/seleccionArgentina.jpg'
import img2 from '../assets/seleccionBrasil.jpg'
import img3 from '../assets/seleccionPortugal.jpg'


const Slider = () => {
    return (
        <>
        <div className='sliderContainer'>
          <Carousel variant="dark" className='slider'>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100"
                src={img1}
                alt="First slide"
              />
              <Carousel.Caption>
{/*                 <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100"
                src={img2}
                alt="Second slide"
              />
              <Carousel.Caption>
{/*                 <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
              <img
                className="d-block w-100"
                src={img3}
                alt="Third slide"
              />
              <Carousel.Caption>
{/*                 <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        </>
      )
}

export default Slider