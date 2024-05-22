import '../Assets/css/Filters.css'
const FiltersPage = () => {
  return (
    <div id="filters-page">
      <header>
        <nav>
          <div className="logo-container">
            <img src="logo.png" alt="Zapatopia Logo" className="logo" />
          </div>
          <div className="cart-container">
            <button>Carrito</button>
          </div>
        </nav>
      </header>
      <main id='filters-page'>
        <aside className="filter-container">
          <h2>¿Qué talla estás buscando?</h2>
          <form>
            <label for="marca">Marca</label>
            <select id="marca" name="marca">
              <option value="">--Seleccionar--</option>
            </select>

            <label for="categoria">Categoría</label>
            <select id="categoria" name="categoria">
              <option value="">--Seleccionar--</option>
            </select>

            <label for="color">Color</label>
            <input type="text" id="color" name="color" />

            <label for="genero">Género</label>
            <select id="genero" name="genero">
              <option value="unisex">Unisex</option>
            </select>

            <label for="precio">Precio</label>
            <div className="price-range">
              <input type="range" id="precio" name="precio" min="0" max="1000" step="10" />
              <div className="price-values">
                <span>0</span>
                <span>300</span>
                <span>1000</span>
              </div>
            </div>
          </form>
        </aside>
        <section className="products-container">
          <div className="product-card">
            <img src="product1.jpg" alt="Producto 1" />
            <p>Marca1</p>
            <p>Descripción modelo 1</p>
            <p>S/ 450.00</p>
          </div>
          <div className="product-card">
            <img src="product2.jpg" alt="Producto 2" />
            <p>Marca2</p>
            <p>Descripción modelo 2</p>
            <p>S/ 320.00</p>
          </div>
          <div className="product-card">
            <img src="product3.jpg" alt="Producto 3" />
            <p>Marca3</p>
            <p>Descripción modelo 3</p>
            <p>S/ 380.00</p>
          </div>
          <div className="product-card">
            <img src="product4.jpg" alt="Producto 4" />
            <p>Marca4</p>
            <p>Descripción modelo 4</p>
            <p>S/ 410.00</p>
          </div>
          <div className="product-card">
            <img src="product5.jpg" alt="Producto 5" />
            <p>Marca5</p>
            <p>Descripción modelo 5</p>
            <p>S/ 290.00</p>
          </div>
          <div className="product-card">
            <img src="product6.jpg" alt="Producto 6" />
            <p>Marca6</p>
            <p>Descripción modelo 6</p>
            <p>S/ 470.00</p>
          </div>
          <div className="product-card">
            <img src="product7.jpg" alt="Producto 7" />
            <p>Marca7</p>
            <p>Descripción modelo 7</p>
            <p>S/ 360.00</p>
          </div>
          <div className="product-card">
            <img src="product8.jpg" alt="Producto 8" />
            <p>Marca8</p>
            <p>Descripción modelo 8</p>
            <p>S/ 420.00</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FiltersPage