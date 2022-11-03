import { Route, Routes } from 'react-router'
import './styles/App.css'
import {Navbar} from './components/Navbar'
import Login from './components/Login'
import Footer from './components/Footer'
import Cart from './components/Cart'
import UserProvider from './components/UserProvider'
import CartProvider from './components/CartProvider'
import ItemListContainer from './components/ItemListContainer'
import ItemDetails from './components/ItemDetails'
import ItemUpdate from './components/ItemUpdate'
import ItemCreate from './components/ItemCreate'

function App() {
 
  return (
    <UserProvider>
      <CartProvider>
        <div className='appContainer'>
          <Navbar/>
          <Routes>
            <Route path='/' element={<ItemListContainer/>} />
            <Route path='/update/:id' element={<ItemUpdate/>} />
            <Route path='/details/:id' element={<ItemDetails/>} />
            <Route path='/create' element={<ItemCreate/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Login/>} />
            <Route path='/cart' element={<Cart/>} />
          </Routes>
          <Footer/>
        </div>
      </CartProvider>
    </UserProvider>
  )
}

export default App
