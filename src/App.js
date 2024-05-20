import React,{useState} from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './Components/Store/CartProvider';
import Chatbot from './Chats';


function App() {
  
const [cartIsShown,setCartIsShown]=useState(false);

const showCartHandler=()=>{
  setCartIsShown(true);
};

const hidecartHandler=()=>{
  setCartIsShown(false)
};

  return (
    <>
    <CartProvider>
      {cartIsShown && <Cart onClose={hidecartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
    <Chatbot/>
    </>
  );
}

export default App;
