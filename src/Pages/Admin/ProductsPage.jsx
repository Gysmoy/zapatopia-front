import { useEffect, useRef, useState } from "react"
import BaseTemplate from "../../BaseTemplate"
import ProductsRest from "../../Rest/ProductsRest"
import Modal from "../../Components/Modal"
import Swal from "sweetalert2"
import moment from 'moment-timezone'

moment.tz.setDefault("America/Lima")
moment.locale("es")

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [modalTittle, setModalTittle] = useState('Agregar producto')
  const [id, setId] = useState(null)

  const modalRef = useRef()
  const categoryRef = useRef()
  const brandref = useRef()
  const nameRef = useRef()
  const purchasePriceRef = useRef()
  const sizeRef = useRef()
  const colorRef = useRef()
  const genderRef = useRef()
  const generalStockRef = useRef()

  const $ = window.$

  useEffect(() => {
    document.title = "Productos"
    loadProducts()
  }, [null])

  const loadProducts = () => {
    ProductsRest.all().then((data) => {
      setProducts(data)
    })
  }

  const resetForm = () => {
    modalRef.current.reset()
  }

  const onModalSubmit = (e) => {
    e.preventDefault()
    const request = {
      id: id || undefined,
      categoria: {
        id: categoryRef.current.value
      },
      marca: {
        id: brandref.current.value
      },
      nombre: nameRef.current.value,
      precioCompra: purchasePriceRef.current.value,
      talla: sizeRef.current.value,
      color: colorRef.current.value,
      genero: genderRef.current.value,
      stockGeneral: generalStockRef.current.value
    }
    ProductsRest.save(request).then(() => {
      resetForm()
      $(modalRef.current).modal('hide')
      loadProducts()
    })
  }

  const onOpenModal = () => {
    setModalTittle('Agregar producto')
    resetForm()
    setId(null)
    $(modalRef.current).modal('show')
  }

  const onEditClicked = (product) => {
    setModalTittle('Editar producto')
    resetForm()
    setId(product.id)
    categoryRef.current.value = product.categoria
    brandref.current.value = product.marca
    nameRef.current.value = product.nombre
    purchasePriceRef.current.value = product.precioCompra
    sizeRef.current.value = product.talla
    colorRef.current.value = product.color
    genderRef.current.value = product.genero
    generalStockRef.current.value = product.stockGeneral
    $(modalRef.current).modal('show')
  }

  const onDeleteClicked = async (id) => {

    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro de eliminar el producto?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })

    if (isConfirmed) {
      ProductsRest.delete(id).then(() => {
        loadProducts()
      })
    }
  }


  return (
    <BaseTemplate title="Productos">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h4 className="header-title mt-0 mb-0">Lista de productos</h4>
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
                      <th>Categoria</th>
                      <th>Marca</th>
                      <th>Nombre</th>
                      <th>Precio Compra</th>
                      <th>Talla</th>
                      <th>Color</th>
                      <th>Genero</th>
                      <th>Stock General</th>
                      <th>Fecha de actualización</th>
                      <th>Acción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => {
                      const { id, categoria, marca, nombre, precioCompra, talla, color, genero, stockGeneral, fechaModificacion } = product
                      return <tr key={`product-${id}`}>
                        <td>{id}</td>
                        <td>{categoria}</td>
                        <td>{marca}</td>
                        <td>{nombre}</td>
                        <td>{precioCompra}</td>
                        <td>{talla}</td>
                        <td>{color}</td>
                        <td>{genero}</td>
                        <td>{stockGeneral}</td>
                        <td>{moment(fechaModificacion).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-xs btn-info" onClick={() => onEditClicked(product)}>Editar</button>
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
      <Modal title={modalTittle} modalRef={modalRef} handleSubmit={onModalSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="category">Categoria</label>
          <input ref={categoryRef} name="category" type="text" className="form-control" required />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="category">Categoria</label>
          <input ref={categoryRef} name="category" type="text" className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          
        </div>
      </Modal>
    </BaseTemplate>
  )
}

export default ProductsPage