import { useEffect, useRef, useState } from "react";
import BrandsRest from "../Rest/BrandsRest";
import CategoriesRest from "../Rest/CategoriesRest";
import ProductsRest from "../Rest/ProductsRest";
import "../Assets/css/Filters.css";
import zapatopia from "../Assets/img/zapatopia.svg";
import { Link } from "react-router-dom";
import { Local } from "sode-extend-react";
const FiltersPage = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState(Local.get("cart") || []);
  const [filters, setFilters] = useState({
    talla: "",
    marca: "",
    categoria: "",
    color: "",
    genero: "",
  });

  useEffect(() => {
    loadBrands();
    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    Local.set("cart", cart);
  }, [cart]);

  // Método para decrementar la cantidad
  const decreaseQuantity = (id) => {
    const updatedQuantities = { ...quantities };
    if (updatedQuantities[id] > 0) {
      updatedQuantities[id] -= 1;
      setQuantities(updatedQuantities);
    }
  };

  // Método para incrementar la cantidad
  const increaseQuantity = (id) => {
    const updatedQuantities = { ...quantities };
    updatedQuantities[id] = (updatedQuantities[id] || 0) + 1;
    setQuantities(updatedQuantities);
  };

  // Método para agregar al carrito
  const addToCart = (product) => {
    // Lógica para agregar el producto con su cantidad al carrito
    const idCart = cart.length ? cart[cart.length - 1].idCart + 1 : 1;
    const updatedCart = [
      ...cart,
      { idCart, ...product, quantity: quantities[product.idStock] || 1 },
    ];
    setCart(updatedCart);

    const updatedQuantities = { ...quantities };
    updatedQuantities[product.idStock] = 0;
    setQuantities(updatedQuantities);
  };

  const loadBrands = () => {
    BrandsRest.all().then((data) => {
      setBrands(data);
    });
  };

  const loadCategories = () => {
    CategoriesRest.all().then((data) => {
      setCategories(data);
    });
  };

  const loadProducts = () => {
    ProductsRest.sales().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  };

  // Manejar el cambio en los filtros
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filtrar los productos según los filtros seleccionados
  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;

      if (filters.talla) {
        filtered = filtered.filter(
          (product) => product.talla === parseInt(filters.talla)
        );
      }
      if (filters.marca) {
        filtered = filtered.filter(
          (product) => product.marca.id === parseInt(filters.marca)
        );
      }
      if (filters.categoria) {
        filtered = filtered.filter(
          (product) => product.categoria.id === parseInt(filters.categoria)
        );
      }
      if (filters.color) {
        filtered = filtered.filter(
          (product) => product.color === filters.color
        );
      }
      if (filters.genero) {
        filtered = filtered.filter(
          (product) => product.genero === filters.genero
        );
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [filters, products]);

  return (
    <div id="filters-page">
      <header>
        <nav>
          <div className="logo-container">
            <img src={zapatopia} alt="Zapatopia Logo" className="logo" />
          </div>
          <div className="cart-container">
            <Link to="/cart">
              <button className="btn btn-outline-light position-relative">
                <i className="fas fa-2x fa-shopping-cart"></i>
                <span className={`${cart.length ? '' : 'd-none'} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}>
                  {cart.length}
                </span>
              </button>
            </Link>
          </div>
        </nav>
      </header>
      <main id="filters-page">
        <aside className="filter-container">
          <h2>¿Qué estás buscando?</h2>
          <form>
            <label for="talla">Talla</label>
            <select id="talla" name="talla" onChange={handleFilterChange}>
              <option value="">--Seleccionar--</option>
              <option value="38"> 38 </option>
              <option value="39"> 39 </option>
              <option value="40"> 40 </option>
              <option value="41"> 41 </option>
              <option value="43"> 43 </option>
              <option value="44"> 44 </option>
              <option value="45"> 45 </option>
            </select>

            <label for="marca">Marca</label>
            <select id="marca" name="marca" onChange={handleFilterChange}>
              <option value="">--Seleccionar--</option>
              {brands.map((brand) => {
                const { id, marca } = brand;
                return <option value={id}>{marca}</option>;
              })}
            </select>

            <label for="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              onChange={handleFilterChange}
            >
              <option value="">--Seleccionar--</option>
              {categories.map((category) => {
                const { id, descripcion } = category;
                return <option value={id}>{descripcion}</option>;
              })}
            </select>

            <label for="color">Color</label>
            <select id="color" name="color" onChange={handleFilterChange}>
              <option value="">--Seleccionar--</option>
              <option value="R"> Rojo </option>
              <option value="A"> Azul </option>
              <option value="N"> Negro </option>
              <option value="R"> Rosado </option>
            </select>

            <label for="genero">Género</label>
            <select id="genero" name="genero" onChange={handleFilterChange}>
              <option value="">--Seleccionar--</option>
              <option value="U"> Unisex </option>
              <option value="M"> Masculino </option>
              <option value="F"> Femenino </option>
            </select>
          </form>
        </aside>
        <section className="products-container">
          {filteredProducts.map((product) => {
            const { id, nombre, descripcion, marca, precioVenta, pathFoto } =
              product;

            return (
              <div className="product-card" key={id}>
                <img src={pathFoto} alt={nombre} />
                <div className="product-details">
                  <p className="nombre-producto">{nombre}</p>
                  <p className="marca">{marca.descripcion}</p>
                  <p className="description">{descripcion}</p>
                  <p className="price">S/ {precioVenta}</p>

                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => decreaseQuantity(product.idStock)}
                    >
                      -
                    </button>
                    <span className="quantity">
                      {quantities[product.id] || 0}
                    </span>{" "}
                    {/* Aquí deberías mantener o manejar la cantidad actual */}
                    <button
                      className="quantity-button"
                      onClick={() => increaseQuantity(product.idStock)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default FiltersPage;
