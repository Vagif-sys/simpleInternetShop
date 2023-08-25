import meal from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';


const Header = (props)=>{
   return <>
   
       <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
       </header>
       <div className={classes['main-image']}>
            <img src={meal} alt='A table full of tasty meals'/>
       </div>
   </>
}

export default Header