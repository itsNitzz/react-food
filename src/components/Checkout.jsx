import { useContext } from "react";

import Modal from "../UI/Modal";
import { currencyFormatter } from "../formatter";
import CartContext from "../store/CartContext";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgessContext from "../store/UserProgressContext";
import useHttp from "../hooks/use-http";
import Error from "./Error";

export default function Checkout() {
  const { meals, resetCart } = useContext(CartContext);
  const { progress, showCart } = useContext(UserProgessContext);
  const [response, error, loading, makeRequest, ClearData] = useHttp("");

  const totalCartValue = meals.reduce(
    (total, { price, quantity }) => total + +price * quantity,
    0
  );

  const onCheckoutHandler = async (e) => {
    e.preventDefault();
    const deliveryDetails = new FormData(e.target);
    const customerDetails = Object.fromEntries(deliveryDetails.entries());

    await makeRequest({
      method: "POST",
      url: "http://localhost:3000/orders",
      data: {
        order: {
          items: meals,
          customer: customerDetails,
        },
      },
    });
  };

  if (response && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={() => showCart("")}>
        <h2>Success!</h2>
        <p>Your order was place successfully!</p>
        <p>
          {" "}
          Your order details and tracking link will be send you via emails.
        </p>
        <div className="modal-actions">
          <Button
            className="button"
            onClick={() => {
              showCart("");
              resetCart();
              ClearData();
            }}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  let actions = (
    <>
      <Button
        className="text-button"
        type="button"
        onClick={() => showCart("")}>
        Close
      </Button>
      <Button className="button" type="submit">
        Submit order
      </Button>
    </>
  );

  if (loading) {
    actions = <span>Sending data...</span>;
  }

  return (
    <Modal
      open={progress === "checkout"}
      onClose={progress === "checkout" ? () => showCart("") : null}>
      <form onSubmit={onCheckoutHandler}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalCartValue)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email Address" id="email" type="text" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title="Failed to submit the order" message={error} />}
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}
