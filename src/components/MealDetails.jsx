import { useContext } from "react";
import Button from "../UI/Button";
import { currencyFormatter } from "../formatter";
import CartContext from "../store/CartContext";

export default function MealsDetails({ meal }) {
  const cartCtx = useContext(CartContext);
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <h3>{meal.name}</h3>
        <div>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <div className="meal-item-actions">
          <Button className="button" onClick={() => cartCtx.addMeal(meal)}>
            Add to Cart
          </Button>
        </div>
      </article>
    </li>
  );
}
