import NavBar from "../Components/NavBar"

const CartPage = () => {
  return (
    <>
      <div className="navbar-custom bg-light">
        <ul className="list-unstyled topnav-menu topnav-menu-left mb-0">
          <li>
            <h4 className="page-title-main">Carrito de compras</h4>
          </li>
        </ul>
      </div>
      <div className="content p-2" style={{ "margin-top": "85px" }}>
        <div className="container-fluid">
          <div className="row">
            <section className="col-8">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Lista de deseos</h4>
                </div>
                <div className="card-body">
                  <table>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Camiseta Balsamiq</td>
                        <td>S/ 19.99</td>
                        <td>1</td>
                        <td>S/ 19.99</td>
                        <td><a href="#">Eliminar</a></td>
                      </tr>
                      <tr>
                        <td>Taza Balsamiq</td>
                        <td>S/ 12.99</td>
                        <td>2</td>
                        <td>S/ 25.98</td>
                        <td><a href="#">Eliminar</a></td>
                      </tr>
                      <tr>
                        <td>Lápiz Balsamiq</td>
                        <td>S/ 5.99</td>
                        <td>3</td>
                        <td>S/ 17.97</td>
                        <td><a href="#">Eliminar</a></td>
                      </tr>
                      <tr>
                        <td>Cuaderno Balsamiq</td>
                        <td>S/ 9.99</td>
                        <td>1</td>
                        <td>S/ 9.99</td>
                        <td><a href="#">Eliminar</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </section>
            <aside className="col-4">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Resumen</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-0">Op. Exoneradas</p>
                    <b>S/256.00</b>
                  </div>
                  <hr className="my-2" />
                  <h4 className="d-flex justify-content-between mb-0">
                    <p className="mb-0">Total</p>
                    <b>S/256.00</b>
                  </h4>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Resumen</h4>
                </div>
                <div className="card-body">
                  <div className="contact-info">
                    <h2>Datos de contacto</h2>
                    <form>
                      <label for="tipo-documento">Tipo documento</label>
                      <select id="tipo-documento" name="tipo-documento">
                        <option value="dni">DNI</option>
                        <option value="ce">CE</option>
                      </select>
                      <input type="text" id="num-documento" name="num-documento" placeholder="Número documento" />

                      <input type="text" id="nombres" name="nombres" placeholder="Nombres" />

                      <input type="text" id="apellido-paterno" name="apellido-paterno" placeholder="Apellido paterno" />

                      <input type="text" id="apellido-materno" name="apellido-materno" placeholder="Apellido materno" />

                      <input type="text" id="direccion" name="direccion" placeholder="Dirección" />

                      <p>¿Cómo deseas que te contactemos?</p>
                      <label><input type="radio" name="contacto" value="whatsapp" /> Por WhatsApp</label>
                      <label><input type="radio" name="contacto" value="llamada" /> Por llamada</label>

                      <button type="submit" className="btn">Solicitar compra</button>
                    </form>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage