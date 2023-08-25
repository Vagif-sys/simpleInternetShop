import classes from "./CheckOut.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const CheckOut = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    post_code: true,
    city: true,
  });
  const nameInput = useRef();
  const streetInput = useRef();
  const post_codeInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPost = post_codeInput.current.value;
    const enteredCity = cityInput.current.value;


    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostIsValid = isFiveChars(enteredPost);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      post_code: enteredPostIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
        name:enteredName,
        street:enteredCity,
        post_code:enteredPost,
        city:enteredCity
    })
    
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postControlClasses = `${classes.control} ${
    formInputValidity.post_code ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputValidity.street && <p>Please enter a street</p>}
      </div>

      <div className={postControlClasses}>
        <label htmlFor="post_code">Post Code</label>
        <input type="text" id="post_code" ref={post_codeInput} />
        {!formInputValidity.post_code && <p>Please enter a post code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formInputValidity.city && <p>Please enter a city</p>}
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
