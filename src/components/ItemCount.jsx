import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useUserContext } from './UserProvider'

function ItemCount({stock, action}) {
  const [count, setCount] = useState(0)
  const user = useUserContext()
  //console.log('stock desde componente items',stock);
  const addItem = () => {
    //implementar logica de validacion
    setCount(count+1)
  }
  const deleteItem = () => {
    //implementar logica de validacion
    setCount(count-1)
  }

  return (
    <div className='itemCounterContainer'>
      <Button variant="outline-primary" onClick={addItem}>+</Button>
        <p>{count}</p>
      <Button variant="outline-primary" onClick={deleteItem}>-</Button>
      {user 
          ? <Button variant="success" className='buttonBuy' onClick={() => {action(count)}} disabled={stock = 0 ? true : null}>Add to cart</Button>
          : <Link to={`/login`}><Button variant="success" className='buttonBuy'>Add to cart</Button></Link>
      }
    </div>
  )
}

export default ItemCount