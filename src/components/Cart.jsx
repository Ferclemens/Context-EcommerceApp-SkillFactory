import React, { useEffect } from "react";
import "../styles/Cart.css";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import { useCartContext } from "./CartProvider";
import '../styles/Item.css'
import { Link } from "react-router-dom";


const Cart = () => {
  const {cart, deleteCart, setCart } = useCartContext()
  console.log('Producto desde componente Cart',cart);
 
  
  useEffect(() => {
    setCart(cart);
  }, [cart]);
  console.log('PRODUCTS', cart);
  /*   function configResult(price) {
    return Number.parseFloat(price).toFixed(2);
  } */

  function configResult(price) {
    const formatPeso = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARG",
      minimumFractionDigits: 0,
    });
    let valor = formatPeso.format(price);
    return valor;
  }
  
  const totalPay = () => {
    let result = 0;
    cart.map((product) => {
      result = result + (product.price * product.count);
    });
    return configResult(result);
  };
  const deleteOneProduct = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          const filterList = cart.filter((item) => item.id != id)
          //console.log('filter list', filterList);
          setCart([...filterList])
          Swal.fire(
            'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        console.log('deteleOneProduct',cart);
      }
    })
  }
  const more = (id, count, stock) => {
    const productIndice = cart.findIndex((product) => product.id === id)
    
    let productToAddItem = cart[productIndice]
    console.log('Product to add item', productToAddItem );

    if (count <= stock){
      productToAddItem = {...productToAddItem, count : productToAddItem.count +1}
      setCart(cart.splice(productIndice, 1 , productToAddItem))
      console.log('see new count in product', productToAddItem )
      console.log('see new cart', cart) 
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Sin Stock!',
    })
    }
  }
  const deletAllList = ()=> {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          deleteCart()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
          }
    })
  }
/*   const totalItemsPrice = cart.reduce((prevValue, currentValue)=> prevValue + (currentValue.count*10),0)
  console.log('total items price', totalItemsPrice); */
  return (
    <div>
      {cart.map((item) => {
        return (
          <div className='cartContainer' key={item.id}>
            <div className='imageContainer'>
              <img className='productImg' src='https://cdn-icons-png.flaticon.com/512/3081/3081648.png'></img>
            </div>
            <div className="detailContainer">
              <p>ID: {item.id}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className="totalContainer">
              <p>Cantidad</p>
              <div className="addToggleContainer">
                <Button variant="outline-primary" onClick={() => more(item.id, item.count, item.stock)}>+</Button>
                <p>{item.count}</p>
                <Button variant="outline-primary" onClick={() => less()}>-</Button>
              </div>
              <p>precio: {item.price}</p>
              <p>TOTAL: {configResult(item.count * item.price)}</p>
              <Button variant="danger" onClick={() => deleteOneProduct(item.id)}>Delete product</Button>
            </div>
          </div>
        )
      })}
      <div className="totalGralContainer">
        <Button variant="danger" onClick={deletAllList}>Delet All List</Button>
        TOTAL {totalPay()}
      </div>
      <Button variant="info">
        <Link to={"/checkout"}>
          Go to pay
        </Link>
      </Button>
    </div>
  )
};
export default Cart;