import { Link, useNavigate , Routes, Route} from "react-router-dom"
import { useEffect, useState } from "react"
import { Local } from "sode-extend-react"
import SalesRest from "../Rest/SalesRest"

const CartPage = () => {
  const [cart, setCart] = useState(Local.get('cart') || [])
  const [totalCart, setTotalCart] = useState(0);
  const [formData, setFormData] = useState({
    tipoDocumento: 'dni',
    numeroDocumento: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    direccion: '',
    correoElectronico: '',
    numeroCelular: '',
    flagNotificar: true,
    medioPreferido: 'llamada'
  });  

  const navigate = useNavigate();
  
  useEffect(() => {
    Local.set('cart', cart);
    if (!cart.length) {
      navigate('/filters');
    }
    calculateTotalCart(cart);
  }, [cart, navigate]);
  
  useEffect(() => {
    document.title = 'Carrito de compras'
  }, [])
  
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if(name === 'flagNotificar') {
      value = e.target.checked
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      cliente: formData,
      detalle: cart.map(item => ({
        producto: {
          idStock: item.idStock,
          id: item.id
        },
        cantidad: item.quantity,
        precio: item.precioVenta
      }))
    };

    console.log('venta generada', orderData);
    SalesRest.generate(orderData).then((data)=> {
      console.log('respuesta venta', data);
      e.target.reset();
      setCart([]);
    });

  }
  const onDeleteClicked = (idCart) => {
    const updatedCart = cart.filter(product => product.idCart !== idCart);
    setCart(updatedCart);
  };

  const calculateTotalCart = (cart) => {
    const total = cart.reduce((curr, item) => {
      return curr + (item.precioVenta * item.quantity);
    }, 0);
    setTotalCart(total);
  } 

  const handleQuantityChange = (idCart, value) => {
    setCart(cart.map(item => item.idCart === idCart ? { ...item, quantity: value } : item));
  };

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
                      {cart.map(({ idCart, nombre, quantity, precioVenta }) => {
                        return <tr key={idCart}>
                          <td>{nombre}</td>
                          <td>S/ {precioVenta}</td>
                          <td style={{ width: '0%' }}>
                            <input type="number" min="1" className="form-control" value={quantity} style={{ width: '100px' }} 
                            onChange={(e) => handleQuantityChange(idCart, parseInt(e.target.value, 10))} />
                          </td>
                          <td>S/ {precioVenta * quantity}</td>
                          <td><button className="btn btn-xs btn-danger" onClick={() => onDeleteClicked(idCart)}>Eliminar</button></td>
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
                    <b>S/ {totalCart}</b>
                  </div>
                  <hr className="my-2" />
                  <h4 className="d-flex justify-content-between mb-0">
                    <p className="mb-0">Total</p>
                    <b>S/ {totalCart}</b>
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title mb-0">Datos de contacto</h4>
                    <button type="submit" className="btn btn-xs btn-primary">Solicitar compra</button>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-lg-6 mb-1">
                        <label for="tipo-documento">Tipo documento</label>
                        <select id="tipo-documento" className="form-control"
                          name="tipoDocumento"
                          value={formData.tipoDocumento}
                          onChange={handleInputChange}
                        >
                          <option value="dni">DNI</option>
                          <option value="ce">CE</option>
                        </select>
                      </div>
                      <div className="form-group col-lg-6 mb-1">
                        <label for="num-documento">Número documento</label>
                        <input type="text" id="num-documento" 
                          name="numeroDocumento" 
                          value = {formData.numeroDocumento}
                          onChange={handleInputChange}
                          className="form-control" />
                      </div>
                      <div className="form-group mb-1">
                        <label htmlFor="">Nombres</label>
                        <input type="text" id="nombres" 
                          name="nombres" 
                          value = {formData.nombres}
                          onChange={handleInputChange}
                          className="form-control" />
                      </div>
                      <div className="form-group col-lg-6 mb-1">
                        <label htmlFor="">Apellido paterno</label>
                        <input type="text" id="apellidoP" 
                          name="apellidoPaterno" 
                          value = {formData.apellidoPaterno}
                          onChange={handleInputChange}
                          className="form-control" />
                      </div>
                      <div className="form-group col-lg-6 mb-1">
                        <label htmlFor="">Apellido materno</label>
                        <input type="text" id="apellidoM" 
                          name="apellidoMaterno"  
                          value = {formData.apellidoMaterno}
                          onChange={handleInputChange}
                          className="form-control" />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="direccion">Direccion</label>
                        <input type="text" id="address" 
                          name="direccion"
                          value = {formData.direccion}
                          onChange={handleInputChange}
                          className="form-control" />
                      </div>

                      <div className="form-group col-lg-9 mb-1">
                        <label htmlFor="">Correo electronico</label>
                        <input type="email" id="email" 
                          name="correoElectronico" 
                          value = {formData.correoElectronico}
                          onChange={handleInputChange}
                          className="form-control" />
                      </div>
                      <div className="form-group col-lg-3 mb-1">
                          <label className="mt-lg-4" style={{ cursor: 'pointer' }}>
                            <input type="checkbox" className="me-1" 
                              name="flagNotificar"
                              value = {formData.flagNotificar}
                              onChange={handleInputChange}
                              checked = {formData.flagNotificar}
                            />
                            Notificarme
                          </label>
                      </div>  

                      <p className="text-muted">Deja que te contactemos para concretar esta venta</p>
                      <div className="form-group col-lg-6 mb-1">
                        <label htmlFor="">Telefono celular</label>
                        <input type="text" id="celular" 
                          name="numeroCelular" 
                          value = {formData.numeroCelular}
                          onChange={handleInputChange}
                          className="form-control" />
                      </div>
                      <div className="form-group col-lg-6 mb-1">
                        <label htmlFor="">Medio de contacto</label>
                        <div className="d-flex justify-content-between">
                          <label className="mt-2" style={{ cursor: 'pointer' }}>
                            <input type="radio" name="medioPreferido" value="whatsapp" className="me-1" 
                              onChange={handleInputChange}
                              checked = {formData.medioPreferido === 'whatsapp'}
                            />
                            WhatsApp
                          </label>
                          <label className="mt-2" style={{ cursor: 'pointer' }}>
                            <input type="radio" name="medioPreferido" value="llamada" className="me-1" defaultChecked 
                              onChange={handleInputChange}
                              checked = {formData.medioPreferido === 'llamada'}
                            />
                            Llamada
                          </label>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </form>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage