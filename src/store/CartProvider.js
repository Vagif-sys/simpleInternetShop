import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
    console.log(action,state)
  if (action.type === "ADD") {
    const addedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;


    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
 

    const exisitingCartItem = state.items[exisitingCartItemIndex];
   console.log(exisitingCartItem)
    let updatedItems;

    if (exisitingCartItem) {
      const updatedItem = {
        ...exisitingCartItem,
        amount: exisitingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exisitingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: addedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const exisitingCartItem = state.items[exisitingCartItemIndex];
    console.log(exisitingCartItem)
    const updatedTotalAmount = state.totalAmount - exisitingCartItem.price
    let updatedItems
    if(exisitingCartItem.amount === 1){
        updatedItems = state.items.filter(item =>item.id !== action.id)
    }else{
       const updatedItem = {...exisitingCartItem, amount:exisitingCartItem.amount - 1}
       updatedItems = [...state.items]
       updatedItems[exisitingCartItemIndex] = updatedItem
    }

    return {

        items:updatedItems,
        totalAmount:updatedTotalAmount
    }
  }

  if(action.type === 'CLEAR'){

      return defaultCartState
  }

  return defaultCartState;
};
const CartProvider = (props) => {

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart:clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
