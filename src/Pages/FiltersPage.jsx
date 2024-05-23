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
                        <option value="running"> Running </option>
                        <option value="trialrunning"> Trial Running </option>
                        <option value="lifestyle"> Lifestyle </option>
                        <option value="tenis"> Tenis </option>
                        <option value="futbol"> Futbol </option>
                        <option value="baloncesto"> Baloncesto </option>
                        <option value="crossfit"> Crossfit </option>
                        <option value="senderismo"> Senderismo </option>
                        <option value="sandalias"> Sandalias </option>
                    </select>

            <label for="color">Color</label>
                    <select id="color" name="color">
                        <option value="">--Seleccionar--</option>
                        <option value="rojo"> Rojo </option>
                        <option value="azul"> Azul </option>
                        <option value="negro"> Negro </option>
                        <option value="rosado"> Rosado </option>
                    </select>

           <label for="genero">Género</label>
                    <select id="genero" name="genero">
                        <option value="">--Seleccionar--</option>
                        <option value="unisex"> Unisex </option>
                        <option value="masculino"> Masculino </option>
                        <option value="femenino"> Femenino </option>
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
            <img src="https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/421756b633a84c3580a4ae8901801435_9366/Zapatillas_adidas_Grand_Court_Cloudfoam_Comfort_Negro_GW9196_01_standard.jpg" alt="Producto 2" />
            <p className="marca">Adidas</p>
            <p className="description">Para pies delgados recomendamos comprar la talla inferior. Revisa la equivalencia, H: Hombre | M: Mujer. Si este artículo es personalizado, no aplica en nuestra política de cambios y devoluciones.</p>
            <p>S/ 320.00</p>
          </div>
          <div className="product-card">
            <img src="https://home.ripley.com.pe/Attachment/WOP_5/2025327921959/2025327921959_2.jpg" alt="Producto 3" />
            <p className="marca">Puma</p>
            <p className="description">Las PUMA-180 recurren a la estética skate de los años 90, actualizada para la actual generación de skaters. Estas zapatillas presentan un diseño robusto, un acolchado grueso y un discreto exterior técnico.</p>
            <p>S/ 380.00</p>
          </div>
          <div className="product-card">
            <img src="https://coliseum.vteximg.com.br/arquivos/ids/606775-1000-1000/ZAPATILLA-MUJER-CONVERSE-CT-AS-LIFT-PLATFORM-A05438C-0_1.jpg?v=638345408790670000" alt="Producto 4" />
            <p className="marca">Converse</p>
            <p className="description">EL ALMA DE LA FIESTA Con estas zapatillas con plataforma en tu colección, seguro que encuentras una excusa para celebrar. Este legendario modelo de corte bajo está diseñado para captar todas las miradas, con un recubrimiento de brillo por toda la superficie y una suela de plataforma apilada.</p>
            <p>S/ 410.00</p>
          </div>
          <div className="product-card">
            <img src="https://vans.com.pe/cdn/shop/files/VN000D3HNVY_HERO.png?v=1698698753&width=493" alt="Producto 5" />
            <p className="marca">Vans</p>
            <p className="description">El modelo Old Skool, es un zapato clasico de skate y es el primer modelo en llevar la iunica franja lateral, su dise??o de perfil bajo con amarre de pasadores cuenta con una parte superior de cuero y lona, con una lengueta y forro acolchados, ademas de la muy reconocida suela de goma con forma de Waffle.</p>
            <p>S/ 290.00</p>
          </div>
          <div className="product-card">
            <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/63e0cf2c-a805-401e-bd8f-cbe1e28115ab/air-max-dn-zapatillas-SBVfbL.png" alt="Producto 6" />
            <p className="marca">Nike</p>
            <p className="description">Presentamos la nueva generación de tecnología Air. Las Air Max Dn cuentan con nuestro sistema de unidades Dynamic Air de tubos de presión dual para ofrecer reactividad en cada pisada. El resultado es un diseño futurista lo suficientemente cómodo para llevarlo de día o de noche.</p>
            <p>S/ 470.00</p>
          </div>
          <div className="product-card">
            <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c7227d99699243099c24ac5e00406c2c_9366/Zapatillas_Forum_Mid_Blanco_FY4976_01_standard.jpg" alt="Producto 7" />
            <p className="marca">Adidas</p>
            <p className="description">Las zapatillas adidas Forum han dominado las canchas de básquet y las calles, y ahora regresan con una versión de corte medio para llevar tus pasos a otro nivel. Envuelve tus pies con un estilo inconfundible en piel revestida prémium para un look que exude clase.</p>
            <p>S/ 360.00</p>
          </div>
          <div className="product-card">
            <img src="https://d3fvqmu2193zmz.cloudfront.net/items_2/uid_commerces.1/uid_items_2.FD282NNV9G2J/500x500/64DD33A74AAC8-Zapatilla-Walking-Mujer-Carina-2-0-Mid.jpg" alt="Producto 8" />
            <p className="marca">Puma</p>
            <p className="description">Las zapatillas Carina 2.0 toman una silueta inspirada en el tenis y le dan un cambio de imagen listo para la playa de California, todo con una generosa dosis de puro estilo de los años 80. Están listos para tomar las calles, y la arena, por asalto, garantizando vibraciones relajadas con cada paso que das.</p>
            <p>S/ 420.00</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FiltersPage