import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove
}) {
  return (
    <div className="cart-item">
      <div className="cart-item-icon">
        <img src={item.imagem} alt="" />
      </div>

      <div className="cart-item-info">
        <h4>{item.name}</h4>

        <span>
          R$ {item.price.toFixed(2).replace(".", ",")}
        </span>

        <div className="quantity-controls">
          <button onClick={() => onDecrease(item.id)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <strong>{item.quantity}</strong>

          <button onClick={() => onIncrease(item.id)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>

          <button
            className="remove-button"
            onClick={() => onRemove(item.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
