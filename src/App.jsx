import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Filters from "./components/Filters";
import Cart from "./components/Cart";
import Spinner from "./components/Spinner";
import About from "./components/About";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLeaf, faShieldHeart, faTruckFast } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("ecotrend-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [category, setCategory] = useState("Todas");
  const [maxPrice, setMaxPrice] = useState(200);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  // Buscar produtos do JSON
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const response = await fetch("/products.json");

        if (!response.ok) {
          throw new Error("Erro ao carregar produtos.");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        setError("Não foi possível carregar os produtos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem("ecotrend-cart", JSON.stringify(cart));
  }, [cart]);

  // Adicionar produto
  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ];
    });

    setCartOpen(true);
  }

  // Aumentar quantidade
  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Diminuir quantidade
  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remover produto
  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  // Filtrar produtos
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "Todas" || product.category === category;

    const matchesPrice =
      product.price <= Number(maxPrice);

    return matchesCategory && matchesPrice;
  });

  // Quantidade total no carrinho
  const cartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Valor total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Checkout com Promise
  function checkout() {
    if (cart.length === 0) {
      setCheckoutMessage("Seu carrinho está vazio.");
      return;
    }

    setCheckoutMessage("Processando seu pedido...");

    new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.1;

        if (success) {
          resolve();
        } else {
          reject(new Error("Falha no processamento."));
        }
      }, 2000);
    })
      .then(() => {
        setCheckoutMessage(
          "Pedido realizado com sucesso! Obrigado por comprar na EcoTrend."
        );

        setCart([]);
      })
      .catch(() => {
        setCheckoutMessage(
          "Não foi possível finalizar a compra. Tente novamente."
        );
      });
  }

  return (
    <div className="app">
      <Header
        cartQuantity={cartQuantity}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="hero-tag">CONSUMO CONSCIENTE</span>

            <h1>
              Escolhas melhores
              <br />
              para o <span>planeta.</span>
            </h1>

            <p>Produtos com propósito, design e origem transparente para transformar pequenas escolhas em grandes mudanças.</p>

            <div className="hero-actions">
              <button className="hero-button" onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}>
                Explorar a seleção <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <a className="hero-link" href="#about">Nossa curadoria</a>
            </div>

            <div className="hero-note"><FontAwesomeIcon icon={faLeaf} /> Curadoria de marcas que fazem bem.</div>
          </div>

          <div className="hero-visual" aria-label="Produtos sustentáveis EcoTrend">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-product hero-product-main"><img src="/assets/garrafa-reutilizavel.jpg" alt="Garrafa reutilizável" /></div>
            <div className="hero-product hero-product-small"><img src="/assets/sabonete-artesanal.jpg" alt="Sabonete artesanal" /></div>
            <div className="hero-badge"><strong>+1.2k</strong><span>escolhas conscientes</span></div>
          </div>
        </section>

        <section className="benefits" aria-label="Compromissos EcoTrend">
          <div><FontAwesomeIcon icon={faLeaf} /><span><strong>Origem verificada</strong>Marcas com propósito</span></div>
          <div><FontAwesomeIcon icon={faTruckFast} /><span><strong>Entrega responsável</strong>Embalagens sem excessos</span></div>
          <div><FontAwesomeIcon icon={faShieldHeart} /><span><strong>Compra segura</strong>Feita para durar mais</span></div>
        </section>

        <section id="products" className="products-section">
          <div className="section-title">
            <div>
              <span>CATÁLOGO</span>
              <h2>Nossos produtos</h2>
            </div>

            <p>
              {filteredProducts.length} produtos encontrados
            </p>
          </div>

          <Filters
            category={category}
            setCategory={setCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

          {loading && <Spinner />}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))
              ) : (
                <p className="no-products">
                  Nenhum produto encontrado.
                </p>
              )}
            </div>
          )}
        </section>

        <About />
      </main>

      <Cart
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        total={cartTotal}
        onCheckout={checkout}
        checkoutMessage={checkoutMessage}
      />

      <footer>
        <strong>EcoTrend </strong>
        <p>Consumo consciente para um futuro sustentável.</p>
      </footer>
    </div>
  );
}

export default App;
