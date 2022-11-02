import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import {collection, deleteDoc, doc, getDocs} from 'firebase/firestore'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../styles/Products.css'
import { useUserContext } from './UserProvider';


function Products() {
    const user = useUserContext()
    const [products, setProducts] = useState([])
    const productsCollection = collection(db,'products')

    const getProducts = async () => {
        const dataProducts = await getDocs(productsCollection)
        //console.log('Base de datos',dataProducts.docs);
        const mapDocs = dataProducts.docs.map((doc) => ({
            ...doc.data(), id: doc.id }))
        setProducts(mapDocs)
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
            getProducts()
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
        }
    }

    useEffect(() => {
        getProducts()
    }, [])
  
    return (
        <div>
            <h1>Products List</h1>
            <div className='cardList'>
                {products.map((product) => {
                    return (
                        <div className='ItemListContainer' key={product.id}>
                            <h3>{product.title}</h3>
                            <div className='detailContainer'>
                                <img className='productImg' src='https://cdn-icons-png.flaticon.com/512/3081/3081648.png'></img>
                                <p>Stock: {product.stock}</p>
                            </div>
                            <div>
                            { user && user.role === "admin" &&
                                <div className='buttonsContainer'>
                                    <Link className='buttonUpdate' to={`/update/${product.id}`}><Button variant="outline-primary">Update</Button></Link>
                                    <Button  variant="outline-danger" className='buttonDelete' onClick={() => confirmDeleteProduct(product.id)}>Delete</Button>
                                </div>
                            }
                                <Link to={`/details/${product.id}`}><Button variant="outline-primary" className='buttonBuy'>Details</Button></Link>
                                <div className='itemCounterContainer'>
                                <Button variant="outline-primary" >+</Button>
                                <p>0</p>
                                <Button variant="outline-primary" >-</Button>
                                <Link to={`/login`}><Button variant="success" className='buttonBuy'>Buy</Button></Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
  )
}

export default Products
