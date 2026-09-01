import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.imagem} alt={product.name} />
        <span className="product-image-label">ECO SELEÇÃO</span>
      </div>

      <span className="product-category">
        {product.category}
      </span>

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <div className="product-footer">
        <strong>
          R$ {product.price.toFixed(2).replace(".", ",")}
        </strong>

        <button onClick={() => onAddToCart(product)}>
          <FontAwesomeIcon icon={faCartPlus} />
          Adicionar
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
