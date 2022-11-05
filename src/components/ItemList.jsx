import React from 'react'
import Item from './Item'
import '../styles/ItemList.css'

function ItemList({data}) {
    console.log("Products en itemList", data);
  return (
    <div>
        <h1>Products List</h1>
            <div className='cardList'>
                {data.map((product) => {
                    return (
                        <Item 
                        key={product.id}
                        id={product.id}
                        stock={product.stock}
                        title={product.title}
                        />
                    )
                })}
            </div>
    </div>
  )
}

export default ItemList