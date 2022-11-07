import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useUserContext } from './UserProvider'
import Swal from 'sweetalert2'

function ItemCount({stock, action}) {
  const [count, setCount] = useState(0)
  const user = useUserContext()
  //console.log('stock desde componente items',stock);
  const addItem = () => {
    count < stock ? setCount(count+1) : 
    Swal.fire({
      icon: 'error',
      title: 'Sin Stock!',
      text: 'No hay mas...',
  })
  }
  const deleteItem = () => {
    stock < 0 ? setCount(count-1) : 
    Swal.fire({
      icon: 'error',
      title: 'no se puede descontar a 0 items',
      text: 'jjj',
  })
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