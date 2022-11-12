import {  useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from './CartProvider'



const Checkout = () => {
  const MySwal = withReactContent(Swal);
  const { cart } = useCartContext()


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
        text: "Su compra se ah realizado con exito",
        icon: "success",
        confirmButtonText: "Ok",
      });

      navigate("/");
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: "Su compra no pudo concretarse",
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
      result
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
      price: "",
    });
  };
  return (
      <section>
        <Container>
        <Row>
          <center><h1>CHECKOUT</h1></center>
        </Row>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Informacion de pago</h6>
              <Form className="billing_form" onSubmit={addPurchase}>
                <FormGroup className="form_group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Ingresa tu nombre"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="email"
                    name="email"
                    placeholder="john_doe@mail.com"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="number"
                    name="phone"
                    placeholder="Numero telefonico"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="text"
                    name="address"
                    placeholder="Dirección"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="text"
                    name="cp"
                    placeholder="Codigo postal"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="text"
                    name="country"
                    placeholder="País"
                    onChange={handleChange}
                  />
                </FormGroup>
                <Button className="buy_btn auth_btn w-100 " type="submit">
                  Pagar
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
                  Subtotal: <span>$total</span>
                </h6>
                <h6>
                  <span>
                    Descuentos: <br />
                  </span>
                  <span>0</span>
                </h6>

                <h4>
                  Total de la compra: <span>{totalValueCart()}</span>
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
 
  );
};

export default Checkout;
