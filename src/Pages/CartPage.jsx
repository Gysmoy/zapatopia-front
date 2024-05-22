import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Local } from "sode-extend-react"

const CartPage = () => {
  const [cart, setCart] = useState(Local.get('cart') || [])
  const [products, setProducts] = useState([])

  useEffect(() => {
    document.title = 'Carrito de compras'
  }, [null])

  return (
    <>
      <div className="navbar-custom bg-light">
        <ul className="list-unstyled topnav-menu topnav-menu-left mb-0">
          <li>
            <h4 className="page-title-main d-flex gap-2 align-items-center">
              Carrito de compras
              <Link to='/filters' className="btn btn-xs btn-danger">Seguir comprando</Link>
            </h4>
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
                  <table className="table table-bordered mb-1">
                    <thead className="table-light">
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Accion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map(({ id, producto, cantidad, precioVenta }) => {
                        return <tr>
                          <td>{producto}</td>
                          <td>S/ {precioVenta}</td>
                          <td style={{ width: '0%' }}>
                            <input type="number" className="form-control" defaultValue={cantidad} style={{ width: '100px' }} />
                          </td>
                          <td>S/ {precioVenta * cantidad}</td>
                          <td><a href="#">Eliminar</a></td>
                        </tr>
                      })}
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
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h4 className="card-title mb-0">Datos de contacto</h4>
                  <button type="submit" className="btn btn-xs btn-primary">Solicitar compra</button>
                </div>
                <div className="card-body">
                  <form className="row">
                    <div className="form-group col-md-6 mb-1">
                      <label for="tipo-documento">Tipo documento</label>
                      <select id="tipo-documento" name="tipo-documento" className="form-control">
                        <option value="dni">DNI</option>
                        <option value="ce">CE</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6 mb-1">
                      <label for="num-documento">Número documento</label>
                      <input type="text" id="num-documento" name="num-documento" className="form-control" />
                    </div>
                    <div className="form-group mb-1">
                      <label htmlFor="">Nombres</label>
                      <input type="text" id="nombres" name="nombres" className="form-control" />
                    </div>
                    <div className="form-group col-md-6 mb-1">
                      <label htmlFor="">Apellido paterno</label>
                      <input type="text" id="apellidos" name="apellidos" className="form-control" />
                    </div>
                    <div className="form-group col-md-6 mb-1">
                      <label htmlFor="">Apellido materno</label>
                      <input type="text" id="apellidos" name="apellidos" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="direccion">Direccion</label>
                      <input type="text" name="address" id="address" className="form-control" />
                    </div>
                    <p className="text-muted">Deja que te contactemos para concretar esta venta</p>
                    <div className="form-group col-md-6 mb-1">
                      <label htmlFor="">Telefono celular</label>
                      <input type="text" id="apellidos" name="apellidos" className="form-control" />
                    </div>
                    <div className="form-group col-md-6 mb-1">
                      <label htmlFor="">Medio de contacto</label>
                      <div className="d-flex justify-content-between">
                        <label className="mt-2" style={{ cursor: 'pointer' }}>
                          <input type="radio" name="contacto" value="whatsapp" className="me-1" />
                          WhatsApp
                        </label>
                        <label className="mt-2" style={{ cursor: 'pointer' }}>
                          <input type="radio" name="contacto" value="llamada" className="me-1" defaultChecked />
                          Llamada
                        </label>
                      </div>
                    </div>

                  </form>
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