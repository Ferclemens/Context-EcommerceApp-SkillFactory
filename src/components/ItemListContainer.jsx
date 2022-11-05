import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import ItemList from './ItemList'

function ItemListContainer() {
    const [items, setItems] = useState([])

    const productsCollection = collection(db,'products')
    const getProducts = async () => {
        const dataProducts = await getDocs(productsCollection)
        const mapDocs = dataProducts.docs.map((doc) => ({
            ...doc.data(), id: doc.id }))
            setItems(mapDocs)
        }
        
    useEffect(() => {
        getProducts()
    }, [])
        
    //console.log('Base de datos',items);
  return (
    <div>
        <ItemList data={items}/>
    </div>
  )
}

export default ItemListContainer