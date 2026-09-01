import CartItem from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faLeaf
} from "@fortawesome/free-solid-svg-icons";

function Cart({
  cart,
  isOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  total,
  onCheckout,
  checkoutMessage
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="cart-overlay">
      <aside className="cart">
        <div className="cart-header">
          <div>
            <span>SEU</span>
            <h2>Carrinho</h2>
          </div>

          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <FontAwesomeIcon icon={faLeaf} />

              <h3>Seu carrinho está vazio</h3>

              <p>
                Adicione produtos sustentáveis para começar.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="total">
            <span>Total</span>

            <strong>
              R$ {total.toFixed(2).replace(".", ",")}
            </strong>
          </div>

          <button
            className="checkout-button"
            onClick={onCheckout}
          >
            Finalizar compra
          </button>

          {checkoutMessage && (
            <p className="checkout-message">
              {checkoutMessage}
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

export default Cart;