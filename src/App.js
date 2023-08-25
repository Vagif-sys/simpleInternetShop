import Cart from "./components/Cart/Cart";
import Header from "./components/Layouts/Header";
import Meals from "./components/Meals/Meals";
import { useState } from "react";
import CartProvider from "./store/CartProvider";

function App() {
  const [isShowCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };
  return (
    <CartProvider>
      {isShowCart && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>

      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
