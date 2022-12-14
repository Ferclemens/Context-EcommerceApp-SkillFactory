import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useUserContext } from './UserProvider'
import Swal from 'sweetalert2'
import '../styles/ItemDetails.css'

function ItemCount({stock, action}) {
  const [count, setCount] = useState(1)
  const user = useUserContext()
  //console.log('stock desde componente items',stock);
  const addItem = () => {
    count < stock ? setCount(count+1) : 
    Swal.fire({
      icon: 'error',
      title: 'Sin Stock!',
  })
  }
  const deleteItem = () => {
    count > 0 ? setCount(count-1) : 
    Swal.fire({
      icon: 'error',
      title: 'no se puede descontar a 0 items',
    }) 
  }

  useEffect(()=>{
    setCount(1)
  },[])

  return (
    <div className='itemCounterContainer'>
      <Button variant="outline-primary" onClick={() => addItem()}>+</Button>
        <p>{count}</p>
      <Button variant="outline-primary" onClick={() => deleteItem()}>-</Button>
      {user 
          ? <Button variant="success" className='buttonBuy' onClick={() => {action(count)}}>Agregar</Button>
          : <Link to={`/login`}><Button variant="success" className='buttonBuy'>Agregar</Button></Link>
      }
    </div>
  )
}

export default ItemCount