import React, { useEffect } from 'react'
import { db } from '../firebase/firebase'
import  {deleteDoc, doc} from 'firebase/firestore'

import Button from 'react-bootstrap/Button';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

import '../styles/Item.css'
import { useUserContext } from './UserProvider';

import { useCartContext } from './CartProvider';
import ItemCount from './ItemCount';
import ShowOnLogin, { ShowAdmin } from './hidenLinks.js'


function Item({id, stock, title, price, image, getProducts}) {
    const user = useUserContext()
    const { cart, addItemToCart } = useCartContext()
    const navigate = useNavigate()

    
    const confirmDeleteProduct = (id) => {
        Swal.fire({
            title: 'Está seguro?',
            text: "No pordrá revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteProduct(id)
            }
            getProducts();
          })
    }
    const deleteProduct = async (id) => {
        const productToDelete = doc(db, 'products',id)
        console.log('producto a borrar', productToDelete);
        try{
            await deleteDoc(productToDelete)
            Swal.fire(
                'Eliminado!',
                'Su producto fue eliminado correctamente.',
                'success'
              )
              navigate('/')
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!'
              })
        }
    }

    const addItem = (count) => {
       
        count > 0 ?
        addItemToCart({id, title, stock, price, image}, count)
        : null
        count > 0 ?
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado correctamente!',
            showConfirmButton: false,
            timer: 1500
          })
        
          : Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error, debe agregar al menos 1 producto.',
            showConfirmButton: false,
            timer: 1500
          })
    }

  


    return (
        <div className='ItemCardContainer'>
            <h3 className='title'>{title}</h3>
            <div className='detailCardContainer'>
                <img className='productImg' src={image}></img>
                <p>Stock: {stock}</p>
                <p>Precio: ${price}</p>
            </div>
            <div>
{/*             <ShowOnLogin>
                <ShowAdmin>
                <div className='buttonsCon  tainer'>
                    <Link className='buttonUpdate' to={`/update/${id}`}><Button variant="outline-primary">Update</Button></Link>
                    <Button  variant="outline-danger" className='buttonDelete' onClick={() => confirmDeleteProduct(id)}>Delete</Button>
                </div>
                </ShowAdmin>
            </ShowOnLogin> */}

            <Link to={`/details/${id}`}><Button variant="outline-primary" className='buttonBuy'>Detalles</Button></Link>
            <ShowOnLogin>
                <ItemCount stock={stock} action={addItem}/>
            </ShowOnLogin>
            </div>
        </div>
    )
}

export default Item
