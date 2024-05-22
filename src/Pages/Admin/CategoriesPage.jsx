import { useEffect, useRef, useState } from "react"
import BaseTemplate from "../../BaseTemplate"
import Modal from "../../Components/Modal"
import CategoriesRest from "../../Rest/CategoriesRest"
import Swal from "sweetalert2"
import moment from "moment-timezone"

moment.tz.setDefault("America/Lima")
moment.locale("es")

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const [modalTittle, setModalTittle] = useState('Agregar categoria')
  const [id, setId] = useState(null)

  const modalRef = useRef()
  const categoryRef = useRef()
  const descriptionRef = useRef()

  const $ = window.$

  useEffect(() => {
    document.title = "Categorias"
    loadCategories()
  }, [null])

  const loadCategories = () => {
    CategoriesRest.all().then((data) => {
      setCategories(data)
    })
  }

  const resetForm = () => {
    resetForm()
  }

  const onModalSubmit = (e) => {
    e.preventDefault()
    const request = {
      id: id || undefined,
      categoria: categoryRef.current.value,
      descripcion: descriptionRef.current.value
    }
    CategoriesRest.save(request).then(() => {
      resetForm()
      $(modalRef.current).modal('hide')
      loadCategories()
    })
  }

  const onOpenModal = () => {
    setModalTittle('Agregar categoria')
    resetForm()
    setId(null)
    $(modalRef.current).modal('show')
  }

  const onEditClicked = (category) => {
    setModalTittle('Editar categoria')
    resetForm()
    setId(category.id)
    categoryRef.current.value = category.categoria
    descriptionRef.current.value = category.descripcion
    $(modalRef.current).modal('show')
  }

  const onDeleteClicked = async (id) => {

    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro de eliminar la categoria?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })

    if (isConfirmed) {
      CategoriesRest.delete(id).then(() => {
        loadCategories()
      })
    }
  }


  return (
    <BaseTemplate title="Categorias">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h4 className="header-title mt-0 mb-0">Lista de categorias</h4>
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
                      <th>Descripción</th>
                      <th>Fecha de actualización</th>
                      <th>Acción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.map((category) => {
                      const { id, categoria, descripcion, fechaModificacion } = category
                      return <tr key={`category-${id}`}>
                        <td>{id}</td>
                        <td>{categoria}</td>
                        <td>{descripcion}</td>
                        <td>{moment(fechaModificacion).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-xs btn-info" onClick={() => onEditClicked(category)}>Editar</button>
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
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea ref={descriptionRef} name="description" className="form-control" rows={3} required />
        </div>
      </Modal>
    </BaseTemplate>
  )
}

export default CategoriesPage