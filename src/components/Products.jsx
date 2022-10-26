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


function Products() {
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
            <h1>Products</h1>
            <div className='cardList'>
                {products.map((product) => {
                    return (
                        <Card key={product.id} className='cardContainer'>
                            <Card.Header as="h5">{product.title}</Card.Header>
                            <Card.Body>
                                <Card.Title>{product.description}</Card.Title>
                                <Card.Text>
                                    Stock: {product.stock}
                                </Card.Text>
                                <Card.Text>
                                    ID: {product.id}
                                </Card.Text>
                                <Stack gap={2} direction="horizontal" className="stackContainer">
                                    <Link to={`/update/${product.id}`}><Button variant="primary">Update</Button></Link>
                                    <Button variant="outline-danger" onClick={() => confirmDeleteProduct(product.id)}>Delete</Button>
                                </Stack>
                                <Stack>
                                    <Link to={`/login`}><Button variant="success" className="mt-2">Buy</Button></Link> 
                                </Stack>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </div>
  )
}

export default Products