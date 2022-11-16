import React from 'react'
import Item from './Item'
import '../styles/ItemList.css'
import Slider from './Slider';


function ItemList({data, getProducts}) {
    //console.log("Products en itemList", data);
  return (
    <div className='itemListContainer'>
        <Slider />
        <div className='TitleContainer'>
            <img  className='arrow' src='https://cdn-icons-png.flaticon.com/512/5548/5548091.png'/>
            <h1 className='titleList'>Catálogo de camisetas</h1>
            <img className='arrow' src='https://cdn-icons-png.flaticon.com/512/5548/5548091.png'/>
        </div>
        <div className='cardList'>
            {data.map((product) => {
                return (
                    <Item 
                    key={product.id}
                    id={product.id}
                    stock={product.stock}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    getProducts={getProducts}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default ItemList