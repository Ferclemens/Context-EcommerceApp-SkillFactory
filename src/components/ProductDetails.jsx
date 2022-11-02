import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { db } from '../firebase/firebase'
import { useUserContext } from './UserProvider'
import '../styles/ProductDetails.css'


function ProductDetails() {
    const [itemCount, setItemCount] = useState(0)
    const [productDetail, setProductDetail] = useState({
        id: '',
        title: '',
        description: '',
        stock: 0
    })
    const { id } = useParams()
    console.log('useparams', id);
    const user = useUserContext()

    const addItem = () => {
        setItemCount(itemCount+1)
    }
    const deleteItem = () => {
        setItemCount(itemCount-1)
    }

    const getProductById = async(id) => {
        const prodRef = doc(db, 'products',id)
        const productSnap = await getDoc(prodRef)
        console.log(productSnap);
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
                    <Button variant="outline-primary" onClick={addItem}>+</Button>
                    <p>{itemCount}</p>
                    <Button variant="outline-primary" onClick={deleteItem}>-</Button>
                {user 
                    ? <Link to={`/cart`}><Button variant="success" className='buttonBuy'>Buy</Button></Link>
                    : <Link to={`/login`}><Button variant="success" className='buttonBuy'>Buy</Button></Link>
                }
                </div>
            </div>
        </div>
    )
}

export default ProductDetails