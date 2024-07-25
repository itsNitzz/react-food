import { useContext } from "react";
import Button from "../UI/Button";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgessContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const showCartCtx = useContext(UserProgessContext);

  const totalCartItems = cartCtx.meals.reduce((acc, meal) => {
    acc += meal.quantity;
    return acc;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="food logo" />
        <h1>ReactFood</h1>
      </div>
      <Button
        className="text-button"
        onClick={() => showCartCtx.showCart("cart")}>
        Cart ({totalCartItems})
      </Button>
    </header>
  );
}
