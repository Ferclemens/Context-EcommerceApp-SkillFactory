import {  useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from './CartProvider'
import '../styles/Checkout.css'



const Checkout = () => {
  const MySwal = withReactContent(Swal);
  const { cart, configResult } = useCartContext()


  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    cp: "",
    city: "",
    country: "",
    countItems: "",
    price: "",
    datePurchase: "",
  });

  const productCollection = collection(db, "purchaseClientList");
  const navigate = useNavigate();

  const addPurchase = async (e) => {
    e.preventDefault();
    try {
      await addDoc(productCollection, user);
      //deleteTotalCart();
      MySwal.fire({
        title: "Created!",
        text: "Your purchase has been made successfully. Enjoy the world cup!",
        icon: "success",
        confirmButtonText: "Ok",
      });

      navigate("/");
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "Please verify your data",
        icon: "error",
        confirmButtonText: "Ok",
      });

      navigate("/");
    }
  };
  const totalValueCart = () => {
    let result = 0
    cart.map((product) => {
      result = result + (product.price * product.count);
    });
    return (
      configResult(result)
    )
  }
  const totalUnits = () => {
    let total = 0
    cart.map((item) =>  {
      total += item.count
    })
    return ( 
      total
    )
  }
  const handleChange = (e) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
      datePurchase: hoy.toLocaleDateString(),
      countItems: cart.length,
      price: totalValueCart(),
    });
  };
  return (
      <section className="checkout__container">
        <Container>
        <Row>
          <center><h1>CHECKOUT</h1></center>
        </Row>
          <Row className="checkout__form">
            <Col lg="8">
              {/* <h6 className="mb-4 fw-bold">Please complete the form below</h6> */}
              <Form className="billing_form" onSubmit={addPurchase}>
                <label>Name</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="text"
                    name="name"
                    placeholder="Please enter your name"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>email</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="email"
                    name="email"
                    placeholder="john_doe@mail.com"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>Contact number</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>Home adress</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>City</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>Postal Code</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="text"
                    name="cp"
                    placeholder="Code"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>Country</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="text"
                    name="country"
                    placeholder="Country"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <Button className="buy_btn auth_btn w-30 " type="submit">
                  To Pay
                </Button>
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkout_cart">
                <h6>
                  Product/s quantity: <span>{cart.length}</span>
                </h6>
                <h6>
                  Total units: <span>{totalUnits()}</span>
                </h6>
                <h6>
                  <span>Discounts: </span><span>$0</span>
                </h6>
                <h6>
                  Subtotal: $<span>{totalValueCart()}</span>
                </h6>

                <h4>
                  Purchase: $<span>{totalValueCart()}</span>
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
 
  );
};

export default Checkout;
