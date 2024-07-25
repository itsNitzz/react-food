import { createContext, useReducer } from "react";

const CartContext = createContext({
  meals: [],
  addMeal: () => {},
  removeMeal: () => {},
  resetCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD") {
    const existingCartMealIndex = state.meals.findIndex(
      (meal) => meal.id === action.cartMeal.id
    );
    const updatedCartMeals = [...state.meals];

    if (existingCartMealIndex > -1) {
      const existingCartMeal = { ...updatedCartMeals[existingCartMealIndex] };
      existingCartMeal.quantity += 1;
      updatedCartMeals[existingCartMealIndex] = existingCartMeal;
    } else {
      updatedCartMeals.push({
        ...action.cartMeal,
        quantity: 1,
      });
    }

    return {
      ...state,
      meals: updatedCartMeals,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartMealIndex = state.meals.findIndex(
      (meal) => meal.id === action.mealId
    );

    const updatedCartMeals = [...state.meals];

    const existingCartMeal = {
      ...updatedCartMeals[existingCartMealIndex],
    };

    if (existingCartMeal.quantity > 1) {
      existingCartMeal.quantity -= 1;
      updatedCartMeals[existingCartMealIndex] = existingCartMeal;
    } else {
      updatedCartMeals.splice(existingCartMealIndex, 1);
    }

    return {
      ...state,
      meals: updatedCartMeals,
    };
  }

  if (action.type === "RESET") {
    return {
      ...state,
      meals: [],
    };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    meals: [],
  });

  const cartContext = {
    meals: cartState.meals,
    addMeal: addMealToCart,
    removeMeal: removeMealToCart,
    resetCart,
  };

  function addMealToCart(meal) {
    dispatchCartAction({ type: "ADD", cartMeal: meal });
  }

  function removeMealToCart(mealId) {
    dispatchCartAction({ type: "REMOVE", mealId });
  }

  function resetCart() {
    dispatchCartAction({ type: "RESET" });
  }

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
