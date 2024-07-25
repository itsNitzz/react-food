import { useContext } from "react";
import { currencyFormatter } from "../formatter";
import CartContext from "../store/CartContext";

export default function CartDetails({ meal }) {
  const { addMeal, removeMeal } = useContext(CartContext);
  return (
    <li className="cart-item">
      <p>
        {meal.name} - {meal.quantity} X {currencyFormatter.format(meal.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => removeMeal(meal.id)}>-</button>
        <button onClick={() => addMeal(meal)}>+</button>
      </p>
    </li>
  );
}
