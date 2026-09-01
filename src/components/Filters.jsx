function Filters({
  category,
  setCategory,
  maxPrice,
  setMaxPrice
}) {
  return (
    <section className="filters">
      <div className="filter-group">
        <label htmlFor="category">
          Categoria
        </label>

        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Roupas">Roupas</option>
          <option value="Acessórios">Acessórios</option>
          <option value="Beleza">Beleza</option>
          <option value="Casa">Casa</option>
          <option value="Tecnologia">Tecnologia</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="price">
          Preço máximo: R$ {maxPrice}
        </label>

        <input
          id="price"
          type="range"
          min="20"
          max="200"
          step="10"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
        />
      </div>
    </section>
  );
}

export default Filters;