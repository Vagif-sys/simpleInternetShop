import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [isCheckOut, setCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const ctxCart = useContext(CartContext);

  const totalAmount = `$${ctxCart.totalAmount.toFixed(2)}`;
  const hasItems = ctxCart.items.length > 0;

  const removeItemFromCart = (id) => {
    ctxCart.removeItem(id);
  };

  const addItemToCart = (item) => {};

  const orderHandler = () => {
    setCheckOut(!isCheckOut);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://reactmeal-4ee29-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body:JSON.stringify({
         user:userData,
         orderedItems:ctxCart.items
      })
    })

    setIsSubmitting(false);
    setDidSubmit(true);
    ctxCart.clearCart()
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctxCart.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemFromCart.bind(null, item.id)}
          onAdd={addItemToCart.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent = <p>Successfully sent the order</p>


  return <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting &&  isSubmittingModalContent}
      {!isSubmitting &&  didSubmit && didSubmitModalContent}
  </Modal>;
};

export default Cart;
