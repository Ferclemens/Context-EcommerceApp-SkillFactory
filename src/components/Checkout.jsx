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
        title: "Gracias!",
        text: "Su compra se realizó correctamente!",
        icon: "success",
        confirmButtonText: "Ok",
      });

      navigate("/");
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "Por favor verificar los datos.",
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
                <label>Nombre</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>Email</label>
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

                <label>Teléfono</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="number"
                    name="phone"
                    placeholder="Teléfono"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>Dirección</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="text"
                    name="address"
                    placeholder="Dirección"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>Ciudad</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>Cod. Postal</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="text"
                    name="cp"
                    placeholder="Código Postal"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <label>País</label>
                <FormGroup className="form_group">
                  <input
                    className="checkout__input"
                    type="text"
                    name="country"
                    placeholder="País"
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <Button className="buy_btn auth_btn w-30 " type="submit">
                  Ir a pagar
                </Button>
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkout_cart">
                <h6>
                  Cantidad de productos: <span>{cart.length}</span>
                </h6>
                <h6>
                  Unidades totales: <span>{totalUnits()}</span>
                </h6>
                <h6>
                  <span>Descuentos: </span><span>$0</span>
                </h6>
                <h6>
                  Subtotal: $<span>{totalValueCart()}</span>
                </h6>

                <h4>
                  A pagar: $<span>{totalValueCart()}</span>
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
 
  );
};

export default Checkout;
