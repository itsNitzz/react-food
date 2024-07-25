import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../formatter";
import Button from "../UI/Button";
import UserProgessContext from "../store/UserProgressContext";
import CartDetails from "./CartDetails";

export default function Cart() {
  const { meals } = useContext(CartContext);
  const { progress, showCart } = useContext(UserProgessContext);
  const totalCartValue = meals.reduce(
    (total, { price, quantity }) => total + +price * quantity,
    0
  );
  let checkout = "";

  if (meals.length)
    checkout = (
      <Button onClick={() => showCart("checkout")} className="button">
        Checkout
      </Button>
    );
  return (
    <Modal
      customClass="modal"
      open={progress === "cart"}
      onClose={progress === "cart" ? () => showCart("") : null}>
      <h2>Your Cart</h2>
      {!meals.length && <p>Your cart is empty!</p>}
      <ul>
        {meals.map((meal) => (
          <CartDetails key={meal.id} meal={meal} />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalCartValue)}</p>
      <p className="modal-actions">
        <Button className="text-button" onClick={() => showCart("")}>
          Close
        </Button>
        {checkout}
      </p>
    </Modal>
  );
}
