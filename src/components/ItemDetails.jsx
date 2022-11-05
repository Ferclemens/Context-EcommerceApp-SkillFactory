import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Navigate, useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { db } from '../firebase/firebase'
import { useUserContext } from './UserProvider'
import '../styles/ProductDetails.css'
import { useCartContext } from './CartProvider'
import ItemCount from './ItemCount'


function ItemDetails() {
    const [productDetail, setProductDetail] = useState({
        id: '',
        title: '',
        description: '',
        stock: 0
    })
    const { id } = useParams()
    //console.log('useparams', id);
    console.log('Product details',productDetail);
    const user = useUserContext()
    const { cart, addItemToCart } = useCartContext()
    const navigate = useNavigate()

    const getProductById = async(id) => {
        const prodRef = doc(db, 'products',id)
        const productSnap = await getDoc(prodRef)
        console.log('detalle de productSnap',productSnap.data());
        if (productSnap.exists()){
          setProductDetail({
            id: id,
            title : productSnap.data().title,
            description :productSnap.data().description,
            stock : productSnap.data().stock
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
    }
    const addItem = (count) => {
       addItemToCart({
            id: productDetail.id, 
            title: productDetail.title, 
            stock: productDetail.stock}, 
            count
        )
    }

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
            navigate('/')
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
        }
    }

    
    useEffect(() => {
        getProductById(id)
      },[id])

    return (
        <div className='itemDetailContainer'>
            <h1>Product Detail</h1>
            <div className='itemCard' key={productDetail.id}>
                <h3>{productDetail.title}</h3>
                <div className='detailContainer'>
                    <img className='productImg' src='https://cdn-icons-png.flaticon.com/512/3081/3081648.png'></img>
                    <p>{productDetail.description}</p>
                    <p>Stock: {productDetail.stock}</p>
                    <p className='detailContainer'>ID: {productDetail.id}</p>
                </div>
                <div className='itemCounterContainer'>
                { user && user.role === "admin" &&
                    <div className='buttonsContainer'>
                        <Link className='buttonUpdate' to={`/update/${productDetail.id}`}><Button variant="outline-primary">Update</Button></Link>
                        <Button  variant="outline-danger" className='buttonDelete' onClick={() => confirmDeleteProduct(productDetail.id)}>Delete</Button>
                    </div>
                }
                    <ItemCount stock={productDetail.stock} initial={0} action={addItem}/>
                </div>
            </div>
        </div>
    )
}

export default ItemDetails