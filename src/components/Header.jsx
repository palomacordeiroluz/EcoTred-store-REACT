import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faCartShopping
} from "@fortawesome/free-solid-svg-icons";

function Header({ cartQuantity, onOpenCart }) {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-mark"><FontAwesomeIcon icon={faLeaf} /></span>
        <span>EcoTrend</span>
      </div>

      <nav>
        <a href="#products">Produtos</a>
        <a href="#about">Sobre nós</a>
      </nav>

      <button className="cart-button" onClick={onOpenCart}>
        <FontAwesomeIcon icon={faCartShopping} />

        <span>Minha sacola</span>

        {cartQuantity > 0 && (
          <b>{cartQuantity}</b>
        )}
      </button>
    </header>
  );
}

export default Header;
