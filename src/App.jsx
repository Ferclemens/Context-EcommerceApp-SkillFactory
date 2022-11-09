import { Route, Routes } from 'react-router'
import './styles/App.css'
import Login from './components/Login'
import Footer from './components/Footer'
import Cart from './components/Cart'
import UserProvider from './components/UserProvider'
import Register from './components/Register'
import Reset from './components/Reset'
import CartProvider from './components/CartProvider'
import ItemListContainer from './components/ItemListContainer'
import ItemDetails from './components/ItemDetails'
import ItemUpdate from './components/ItemUpdate'
import ItemCreate from './components/ItemCreate'
import { Header } from './components/Header'
import Checkout from "./components/Checkout";
import ListPurchaseContainer from './components/ListPurchaseContainer'


function App() {
 
  return (
    <UserProvider>
      <CartProvider>
        <div className='appContainer'>
          <Header/>
          <Routes>
            <Route path='/' element={<ItemListContainer/>} />
            <Route path='/update/:id' element={<ItemUpdate/>} />
            <Route path='/details/:id' element={<ItemDetails/>} />
            <Route path='/create' element={<ItemCreate/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/reset' element={<Reset/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/order-history' element={<ListPurchaseContainer/>} />

       
          </Routes>
          <Footer/>
        </div>
      </CartProvider>
    </UserProvider>
  )
}

export default App
