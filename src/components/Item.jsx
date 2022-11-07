import React from 'react'
import { db } from '../firebase/firebase'
import  {deleteDoc, doc} from 'firebase/firestore'

import Button from 'react-bootstrap/Button';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

import '../styles/Item.css'
import { useUserContext } from './UserProvider';

import { useCartContext } from './CartProvider';
import ItemCount from './ItemCount';


function Item({id, stock, title}) {
    const user = useUserContext()
    const { cart, addItemToCart } = useCartContext()
    const navigate = useNavigate()

    
    const confirmDeleteProduct = (id) => {
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
              deleteProduct(id)
                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }
    const deleteProduct = async (id) => {
        const productToDelete = doc(db, 'products',id)
        console.log('producto a borrar', productToDelete);
        try{
            await deleteDoc(productToDelete)
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              navigate('/')
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
        }
    }

    const addItem = (count) => {
        if(count != 0){
            addItemToCart({id, title, stock}, count)
        } else {
            Swal.fire('Can\'t add 0 product')
        }
    }

    return (
        <div className='ItemListContainer'>
            <h3>{title}</h3>
            <div className='detailContainer'>
                <img className='productImg' src='https://cdn-icons-png.flaticon.com/512/3081/3081648.png'></img>
                <p>Stock: {stock}</p>
            </div>
            <div>
            { user && user.role === "admin" &&
                <div className='buttonsContainer'>
                    <Link className='buttonUpdate' to={`/update/${id}`}><Button variant="outline-primary">Update</Button></Link>
                    <Button  variant="outline-danger" className='buttonDelete' onClick={() => confirmDeleteProduct(id)}>Delete</Button>
                </div>
            }
            <Link to={`/details/${id}`}><Button variant="outline-primary" className='buttonBuy'>Details</Button></Link>
            <ItemCount stock={stock} action={addItem}/>
            </div>
        </div>
    )
}

export default Item
