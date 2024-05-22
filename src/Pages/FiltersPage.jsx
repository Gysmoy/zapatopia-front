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
          <h2>¿Qué estás buscando?</h2>
          <form>

          <label for="talla">Talla</label>
                    <select id="talla" name="talla">
                        <option value="">--Seleccionar--</option>
                        <option value="38"> 38 </option>
                        <option value="39"> 39 </option>
                        <option value="40"> 40 </option>
                        <option value="41"> 41 </option>
                        <option value="42"> 42 </option>
                    </select>

            <label for="marca">Marca</label>
                    <select id="marca" name="marca">
                        <option value="">--Seleccionar--</option>
                        <option value="Nike"> Nike </option>
                        <option value="Adidas"> Adidas </option>
                        <option value="Puma"> Puma </option>
                        <option value="Converse"> Converse </option>
                        <option value="Vans"> Vans </option>
                    </select>

            <label for="categoria">Categoría</label>
                    <select id="categoria" name="categoria">
                        <option value="">--Seleccionar--</option>
                        <option value="">--Seleccionar--</option>
                        <option value="">--Seleccionar--</option>
                        <option value="">--Seleccionar--</option>
                        <option value="">--Seleccionar--</option>
                    </select>

           <label for="genero">Género</label>
                    <select id="genero" name="genero">
                        <option value="">--Seleccionar--</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>

          </form>
        </aside>
        <section className="products-container">
          <div className="product-card">
            <img src="https://www.nike.com.pe/dw/image/v2/BJKZ_PRD/on/demandware.static/-/Sites-catalog-equinox/default/dwa0bb0c83/images/hi-res/194499062790_1_20240126120000-mrtPeru.jpg?sw=800&sh=800" alt="Producto 1" />
            <p className="marca">Nike</p>
            <p className="description">El fulgor vive en Nike Air Force 1 ’07, el ícono del básquetbol que le da un toque fresco a las características más recordadas: colores audaces y la cantidad perfecta de destellos para que brilles.</p>
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