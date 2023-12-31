// import classes from './Cart.module.css';
// import Modal from '../UI/Modal';
// import CartContext from '../Store/cart-context';
// import { useContext,useState } from 'react';
// import CartItem from './CartItem';
// import Checkout from './Checkout';

// const Cart=(props)=>{

//     const[isCheckout,setIsCheckout]=useState(false);

//     const cartCtx=useContext(CartContext);
//     const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
//     const hasItems=cartCtx.items.length>0;

//     const cartItemAddHandler=(item)=>{
//         cartCtx.addItem(item);
//     };

//     const cartItemRemoveHandler=(id)=>{
//         cartCtx.removeItem(id);
//     };

//     const CheckoutHandler=()=>{
//         setIsCheckout(true);
//     }

//     const submitOrderHandler=(userData)=>{   
//         fetch('https://foodorderapp-78d7e-default-rtdb.firebaseio.com/orders.json',{
//             method: 'POST',
//             body: JSON.stringify({
//                 user: userData,
//                 orderedItems: cartCtx.items
//             })
//         });
//     };

//     const cartItems=<ul className={classes['cart-items']}>{
//             cartCtx.items.map((item)=>(
//                 <CartItem 
//                     key={item.id} 
//                     name={item.name} 
//                     amount={item.amount} 
//                     price={item.price}
//                     onRemove={cartItemRemoveHandler.bind(null,item.id)} 
//                     onAdd={cartItemAddHandler.bind(null,item)}   
//                 />
//             ) )} 
//             </ul>

//         const modalActions= <div className={classes.actions}>
//         <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
//         {hasItems && <button className={classes.button} onClick={CheckoutHandler}>Order</button>}
//     </div>

//     return (
//         <Modal onClose={props.onClose}>
//             {cartItems}
//             <div className={classes.total}>
//                 <span>Total Amount</span>
//                 <span>{totalAmount}</span>
//             </div>
//             {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
//             {!isCheckout && modalActions}
//         </Modal>
//     );
// };

// export default Cart;

import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../Store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async(userData) => {
    setIsSubmitting(true);
    await fetch('https://foodorderapp-78d7e-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;