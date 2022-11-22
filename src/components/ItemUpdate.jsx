import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'
import '../styles/ItemUpdate.css'

function ItemUpdate() {
    const [updateProduct, setUpdateProduct] = useState({
      title: '',
      description: '',
      stock: 0,
      image: '',
      price: 0
  })
  const navigate = useNavigate()
  const { id } = useParams()

  const getProductById = async(id) => {
    const prodRef = doc(db, 'products',id)
    const productSnap = await getDoc(prodRef)
    //console.log(productSnap);
    if (productSnap.exists()){
      setUpdateProduct({
        title : productSnap.data().title,
        description :productSnap.data().description,
        stock : productSnap.data().stock,
        image : productSnap.data().image,
        price : productSnap.data().price
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
      navigate('/')
    }
  }

  const handleChange = (e) => {
    setUpdateProduct({...updateProduct, [e.target.name] : e.target.value})
  }
  
  const editProduct = async (e) => {
    e.preventDefault()
    const {title, description, stock, image, price} = updateProduct
    const prodRef = doc(db,'products',id)
    const newData = {
      title,
      description,
      stock,
      image,
      price
    }
    try {
      await updateDoc(prodRef,newData)
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
      console.log(error);
      navigate('/')
    }
  }

  useEffect(() => {
    getProductById(id)
  },[id])
  //console.log('getProductById(id)',updateProduct);
    
  return (
    <div className='update__container'>
        <Form className='formUpdate__container' onSubmit={(e) => editProduct(e)}>
          <p className='update__title'>Update Products</p>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
            <Form.Control className='update__input' type="text" name='title' value={updateProduct.title} placeholder="Enter title" onChange={(e) => handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control style={{ height: '200px' }} className='update__textarea' as='textarea' type="text" name='description' value={updateProduct.description} placeholder="Enter description" onChange={(e) => handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control className='update__input' type="number" name='stock' value={updateProduct.stock} placeholder="Enter stock" onChange={(e) => handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control className='update__input' type="text" name='image' value={updateProduct.image} placeholder="Enter link" onChange={(e) => handleChange(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control className='update__input' type="number" name='price' value={updateProduct.price} placeholder="Enter new price" onChange={(e) => handleChange(e)}/>
            </Form.Group>
            <Button className='updateItem__btn' variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  )
}

export default ItemUpdate