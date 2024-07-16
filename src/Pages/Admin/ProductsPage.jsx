import { useEffect, useRef, useState } from "react"
import BaseTemplate from "../../BaseTemplate"
import ProductsRest from "../../Rest/ProductsRest"
import Modal from "../../Components/Modal"
import Swal from "sweetalert2"
import moment from 'moment-timezone'
import BrandsRest from "../../Rest/BrandsRest"
import CategoriesRest from "../../Rest/CategoriesRest"
import ReactSelect from "react-select"
import WarehousesRest from "../../Rest/WarehousesRest"

moment.tz.setDefault("America/Lima")
moment.locale("es")

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [categoryState, setCategoryState] = useState(null);
  const [brandState, setBrandState] = useState(null);
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

  const $ = window.$

  useEffect(() => {
    document.title = "Productos"
    loadProducts()
    loadBrands()
    loadCategories()
    loadWarehouses()
  }, [])

  const loadProducts = () => {
    ProductsRest.all().then((data) => {
      setProducts(data)
    })
  }

  const loadBrands = () => {
    BrandsRest.all().then((data) => {
      setBrands(data)
    })
  }

  const loadCategories = () => {
    CategoriesRest.all().then((data) => {
      setCategories(data)
    })
  }

  const loadWarehouses = () => {
    WarehousesRest.all().then((data) => {
      setWarehouses(data)
    })
  }

  const resetForm = () => {
    modalRef.current.reset()
  }

  const onModalSubmit = (e) => {
    e.preventDefault()
    
    const selectedCategory = categoryRef.current.getValue()[0]
    const selectedBrand = brandref.current.getValue()[0]

    const request = {
      id: id || undefined,
      categoria: {
        id: selectedCategory.value,
        categoria: selectedCategory.label
      },
      marca: {
        id: selectedBrand.value,
        marca: selectedBrand.label
      },
      nombre: nameRef.current.value,
      precioCompra: purchasePriceRef.current.value,
      talla: sizeRef.current.value,
      color: colorRef.current.value,
      genero: genderRef.current.value,
      stock: warehouses.map(({ id, almacen }) => {
        const cantidad = $(`[name="stock"][data-id="${id}"]`).val()
        const precioVenta = $(`[name="salePrice"][data-id="${id}"]`).val()
        return {
          id,
          almacen,
          cantidad,
          precioVenta
        }
      }).filter(warehouse => warehouse.cantidad > 0)
    }
    console.log(request);
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
    categoryRef.current.value = product.categoria;
    brandref.current.value = product.marca
    nameRef.current.value = product.nombre
    purchasePriceRef.current.value = product.precioCompra
    sizeRef.current.value = product.talla
    colorRef.current.value = product.color
    genderRef.current.value = product.genero

    setCategoryState({ value: product.categoria.id, label: product.categoria.categoria })
    setBrandState({ value: product.marca.id, label: product.marca.descripcion })
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

  const handleCategoryChange = (selectedOption) => {
    setCategoryState(selectedOption);
    categoryState.current.value = categories.find(category => category.id === selectedOption.value);
  };

  const handleBrandChange = (selectedOption) => {
    setBrandState(selectedOption);
    brandref.current.value = brands.find(brand => brand.id === selectedOption.value);
  };


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
                        <td>{categoria.descripcion}</td>
                        <td>{marca.descripcion}</td>
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
      <Modal title={modalTittle} modalRef={modalRef} handleSubmit={onModalSubmit} size="md">
        <div className="row">
          <div className="form-group col-12 mb-2">
            <label htmlFor="description">Nombre</label>
            <input ref={nameRef} type="text" className="form-control" />
          </div>
          <div className="form-group col-md-4 mb-2">
            <label htmlFor="category">Categoria</label>
            <ReactSelect ref={categoryRef} value={categoryState} onChange={handleCategoryChange} options={categories.map(({ id, categoria }) => ({ value: id, label: categoria }))} />
          </div>
          <div className="form-group col-md-4 mb-2">
            <label htmlFor="category">Marca</label>
            <ReactSelect ref={brandref} value={brandState} onChange={handleBrandChange} options={brands.map(({ id, marca }) => ({ value: id, label: marca }))} />
          </div>
          <div className="form-group col-md-4 mb-2">
            <label htmlFor="">Color</label>
            <select ref={colorRef} name="" id="" className="form-control">
              <option value="">--Seleccionar--</option>
              <option value="R"> Rojo </option>
              <option value="A"> Azul </option>
              <option value="N"> Negro </option>
              <option value="R"> Rosado </option>
            </select>
          </div>
          <div className="form-group col-md-4 mb-2">
            <label htmlFor="">Precio compra</label>
            <input ref={purchasePriceRef} type="number" name="" id="" className="form-control" />
          </div>
          <div className="form-group col-md-4 mb-2">
            <label htmlFor="">Talla</label>
            <select ref={sizeRef} name="" id="" className="form-control">
              <option value="">--Seleccionar--</option>
              <option value="38"> 38 </option>
              <option value="39"> 39 </option>
              <option value="40"> 40 </option>
              <option value="41"> 41 </option>
              <option value="42"> 42 </option>
              <option value="43"> 43 </option>
              <option value="44"> 44 </option>
              <option value="45"> 45 </option>
            </select>
          </div>
          <div className="form-group col-md-4 mb-2">
            <label htmlFor="">Genero</label>
            <select ref={genderRef} name="" id="" className="form-control">
              <option value="">--Seleccionar--</option>
              <option value="U">Unisex</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="col-12">
            <hr className="mt-1 mb-2" />
          </div>
          <div className="form-group col-12">
            <b htmlFor="">Stock y precio x almacen</b>
            <table className="table table-sm table-bordered mb-0">
              <thead>
                <tr>
                  <th>Almacen</th>
                  <th>Stock</th>
                  <th>P. venta</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map(({ id, almacen }) => {
                  return <tr key={`warehouse-${id}`}>
                    <td>{almacen}</td>
                    <td className="p-0" style={{ width: '0%' }}>
                      <input name='stock' data-id={id} type="number" className="form-control" style={{ width: '75px' }} />
                    </td>
                    <td className="p-0" style={{ width: '0%' }}>
                      <input name='salePrice' data-id={id} type="number" className="form-control" style={{ width: '75px' }} />
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>

        </div>
      </Modal>
    </BaseTemplate>
  )
}

export default ProductsPage