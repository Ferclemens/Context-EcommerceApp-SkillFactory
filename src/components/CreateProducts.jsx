import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import { db } from '../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Products from './Products';

function CreateProducts() {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        stock: 0
    })
    const navigate = useNavigate()
    const productsCollection = collection(db,'products')
    
    const handleChange = (e) => {
        setProduct({...product, [e.target.name] : e.target.value})
        //console.log(e.target.name,'---', e.target.value);
    }

    const addProduct = async (e) => {
        e.preventDefault()
        try {
            await addDoc(productsCollection, product)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 2000
              })
            navigate('/')
        } catch(error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
            console.log(error)
            navigate('/')
        }
    }
       
  return (
    <div>
        <div>CreateProducts</div>
        <Form onSubmit={(e) => addProduct(e)}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name='title' value={product.title} placeholder="Enter title" onChange={(e) => handleChange(e)}/>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name='description' value={product.description} placeholder="Enter description" onChange={(e) => handleChange(e)}/>
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" name='stock' value={product.stock} placeholder="Enter stock" onChange={(e) => handleChange(e)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  )
}

export default CreateProducts