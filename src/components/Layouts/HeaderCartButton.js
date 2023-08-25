import {useContext,useState,useEffect} from 'react'
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [isHighlited, setIsHighlited] = useState(false)
  const ctxCart = useContext(CartContext)

  const numberOfCartItems = ctxCart.items.reduce((curNumber, item)=>{
       return curNumber + item.amount
  },0)

  const {items} = ctxCart

  const btnClasses = `${classes.button} ${isHighlited ? classes.bump : ''}`

  useEffect(()=>{
    if(items.length === 0 ){
       return 
    }
    setIsHighlited(true)

    setTimeout(()=>{
       setIsHighlited(false)
    },300)
  },[items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
