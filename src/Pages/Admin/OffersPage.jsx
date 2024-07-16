import { useEffect, useRef, useState } from "react"
import BaseTemplate from "../../BaseTemplate"
import Modal from "../../Components/Modal"
import OffersRest from "../../Rest/OffersRest"
import Swal from "sweetalert2"
import moment from "moment-timezone"
import ProductsRest from "../../Rest/ProductsRest"
import ReactSelect from "react-select"

moment.tz.setDefault("America/Lima")
moment.locale("es")

const OffersPage = () => {
  const [offers, setOffers] = useState([])
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalTittle, setModalTittle] = useState('Agregar oferta')
  const [id, setId] = useState(null)

  const modalRef = useRef()
  const productRef = useRef()
  const cantidadEntregarRef = useRef()
  const cantidadComprarRef = useRef()
  const autoSend = useRef()

  const $ = window.$

  useEffect(() => {
    document.title = "Ofertas"
    autoSend.current.value = true;
    loadOffers()
    loadProducts()
  }, [])

  const loadOffers = () => {
    OffersRest.all().then((data) => {
      setOffers(data)
    })
  }

  const loadProducts = () => {
    ProductsRest.sales().then((data) => {
      setProducts(data)
    })
  }

  const resetForm = () => {
    modalRef.current.reset()
  }

  const handleChangeCombo = (selectedOption) => {
    setSelectedProduct(selectedOption);
    productRef.current.value = products.find(product => product.id === selectedOption.value);
  };

  const onModalSubmit = (e) => {
    e.preventDefault()
    const request = {
      producto: {
        id: productRef.current.value.id
      },
      cantidadEntregar: cantidadEntregarRef.current.value,
      cantidadComprar: cantidadComprarRef.current.value,
      envioAutomatico: autoSend.current.checked
    }
    console.log(request);
    OffersRest.save(request).then(() => {
      resetForm()
      $(modalRef.current).modal('hide')
      loadOffers()
    })
  }

  const onOpenModal = () => {
    setModalTittle('Agregar oferta')
    resetForm()
    setId(null)
    autoSend.current.checked = true;
    $(modalRef.current).modal('show')
  }

  const onSendClicked = (id) => {
    OffersRest.send(id);
  }

  const onDeleteClicked = async (id) => {

    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro de eliminar la oferta?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })

    if (isConfirmed) {
      OffersRest.delete(id).then(() => {
        loadOffers()
      })
    }
  }


  return (
    <BaseTemplate title="Ofertas">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h4 className="header-title mt-0 mb-0">Lista de ofertas</h4>
              <div>
                <button className="btn btn-xs btn-primary" onClick={onOpenModal}>Agregar</button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-centered table-bordered mb-0" id="btn-editable">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Producto</th>
                      <th>Cantidad a entregar</th>
                      <th>Cantidad a cobrar</th>
                      <th>Fecha de actualización</th>
                      <th>Acción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {offers.map((offer) => {
                      const { id, producto: {nombre: nombreProducto}, cantidadEntregar, cantidadComprar, fechaModificacion } = offer
                      return <tr key={`offer-${id}`}>
                        <td>{id}</td>
                        <td>{nombreProducto}</td>
                        <td>{cantidadEntregar}</td>
                        <td>{cantidadComprar}</td>
                        <td>{moment(fechaModificacion).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-xs btn-info" onClick={() => onSendClicked(id)}>Enviar</button>
                            <button className="btn btn-xs btn-danger" onClick={() => onDeleteClicked(id)}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal title={modalTittle} modalRef={modalRef} handleSubmit={onModalSubmit} size="md">
        <div className="row">
            <div className="form-group mb-2 col-12">
                <label htmlFor="cboProducto">Producto</label>
                <ReactSelect id="cboProducto" ref={productRef} value={selectedProduct} onChange={handleChangeCombo}options={products.map(({ id, nombre }) => ({ value: id, label: nombre }))} />
            </div>
            <div className="form-group col-sm-6">
                <label htmlFor="txtCantidadXEntregar">Cantidad por entregar</label>
                <input type="number" id="txtCantidadXEntregar" className="form-control" ref={cantidadEntregarRef} required />
            </div>
            <div className="form-group col-sm-6">
                <label htmlFor="txtCantidadXCobrar">Cantidad por cobrar</label>
                <input type="number" id="txtCantidadXCobrar" className="form-control" ref={cantidadComprarRef} required />
            </div>
            <div className="form-group col-sm-12 mt-2">
                <label style={{ cursor: 'pointer' }}>
                <input type="checkbox" className="me-1" 
                    name="flagEnvioAutomatico"
                    ref={autoSend}
                />
                Envio automatico
                </label>
            </div>  
        </div>
      </Modal>
    </BaseTemplate>
  )
}

export default OffersPage