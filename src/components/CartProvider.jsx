import React, { createContext, useContext, useState } from 'react'

const cartContext = createContext()

export function useCartContext() {
  return useContext(cartContext)
}

function CartProvider({children}) {
  const [cart, setCart] = useState([])

  const addItemToCart = (item,count) => {
    if (cart.some((element) => element.id === item.id)) {
      //console.log('ya existe producto en el carrito')
      
      const indexProduct = cart.findIndex (
        (element) => element.id === item.id
        )
        //console.log('item id', indexProduct)

        let product = cart[indexProduct]
        //console.log('product to add', product);
        product = {...product, count: product.count + count}
        //console.log("product added", product)

        const newCart = [...cart]
        newCart.splice(indexProduct, 1, product)
        setCart(newCart)
    } else {
      let product = {...item, count}
      setCart([...cart, product])
    }
  } 
  //console.log('CART desde CartProvider',cart);

  const deleteCart = () => {
    setCart([])
  }
  function configResult(price) {
    const formatPeso = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARG",
      minimumFractionDigits: 0,
    });
    let valor = formatPeso.format(price);
    return valor;
  }
  return (
    <cartContext.Provider value={{cart, addItemToCart, deleteCart, setCart, configResult}}>
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider