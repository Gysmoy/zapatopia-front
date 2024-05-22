import { useEffect, useRef, useState } from "react"
import BaseTemplate from "../../BaseTemplate"
import BrandsRest from "../../Rest/BrandsRest"
import Modal from "../../Components/Modal"

const BrandsPage = () => {
  const [brands, setBrands] = useState([])
  const [modalTittle, setModalTittle] = useState('Agregar marca')

  const modalRef = useRef()
  const $ = window.$

  useEffect(() => {
    document.title = "Marcas"
    loadBrands()
  }, [null])

  const loadBrands = () => {
    BrandsRest.all().then((data) => {
      setBrands(data)
    })
  }

  const onModalSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(modalRef.current)
    const request = {
      id: formData.get('id') || undefined,
      marca: formData.get('brand'),
      descripcion: formData.get('description')
    }
    BrandsRest.save(request).then(() => {
      modalRef.current.reset()
      $(modalRef.current).modal('hide')
      loadBrands()
    })
  }

  const onOpenModal = () => {
    setModalTittle('Agregar marca')
    modalRef.current.reset()
    $(modalRef.current).modal('show')
  }

  const onEditClicked = (brand) => {
    setModalTittle('Editar marca')
    modalRef.current.reset()
    modalRef.current.id.value = brand.id
    modalRef.current.brand.value = brand.marca
    modalRef.current.description.value = brand.descripcion
    $(modalRef.current).modal('show')
  }

  const onDeleteClicked = (id) => {
    BrandsRest.delete(id).then(() => {
      loadBrands()
    })
  }


  return (
    <BaseTemplate title="Marcas">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h4 className="header-title mt-0 mb-0">Lista de marcas</h4>
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
                      <th>Marca</th>
                      <th>Descripción</th>
                      <th>Acción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {brands.map((brand) => {
                      const { id, marca, descripcion } = brand
                      return <tr key={`brand-${id}`}>
                        <td>{id}</td>
                        <td>{marca}</td>
                        <td>{descripcion}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-xs btn-info" onClick={() => onEditClicked(brand)}>Editar</button>
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
        <input type="hidden" name="id" />
        <div className="form-group mb-2">
          <label htmlFor="brand">Marca</label>
          <input id="brand" name="brand" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea id="description" name="description" className="form-control" rows={3} />
        </div>
      </Modal>
    </BaseTemplate>
  )
}

export default BrandsPage