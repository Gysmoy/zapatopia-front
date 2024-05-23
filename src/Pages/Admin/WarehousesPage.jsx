import { useEffect, useRef, useState } from "react"
import BaseTemplate from "../../BaseTemplate"
import Modal from "../../Components/Modal"
import Swal from "sweetalert2"
import moment from 'moment-timezone'
import WarehousesRest from "../../Rest/WarehousesRest"

moment.tz.setDefault("America/Lima")
moment.locale("es")

const WarehousesPage = () => {
  const [warehouses, setWarehouses] = useState([])
  const [modalTittle, setModalTittle] = useState('Agregar marca')
  const [id, setId] = useState(null)

  const modalRef = useRef()
  const warehouseRef = useRef()
  const addressRef = useRef()

  const $ = window.$

  useEffect(() => {
    document.title = "Almacenes"
    loadWarehouses()
  }, [null])

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
    const request = {
      id: id || undefined,
      almacen: warehouseRef.current.value,
      direccion: addressRef.current.value
    }
    WarehousesRest.save(request).then(() => {
      resetForm()
      $(modalRef.current).modal('hide')
      loadWarehouses()
    })
  }

  const onOpenModal = () => {
    setModalTittle('Agregar almacen')
    resetForm()
    setId(null)
    $(modalRef.current).modal('show')
  }

  const onEditClicked = (warehouse) => {
    setModalTittle('Editar almacen')
    resetForm()
    setId(warehouse.id)
    modalRef.current.warehouse.value = warehouse.almacen
    modalRef.current.address.value = warehouse.direccion
    $(modalRef.current).modal('show')
  }

  const onDeleteClicked = (id) => {
    const { isConfirmed } = Swal.fire({
      title: '¿Estás seguro de eliminar el almacen?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })
    if (isConfirmed) {
      WarehousesRest.delete(id).then(() => {
        loadWarehouses()
      })
    }

  }

  return (
    <BaseTemplate title="Almacenes">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h4 className="header-title mt-0 mb-0">Lista de almacenes</h4>
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
                      <th>Almacen</th>
                      <th>Direccion</th>
                      <th>Fecha actualización</th>
                      <th>Acción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {warehouses.map((warehouse) => {
                      const { id, almacen, direccion, fechaModificacion } = warehouse
                      return <tr key={`warehouse-${id}`}>
                        <td>{id}</td>
                        <td>{almacen}</td>
                        <td>{direccion}</td>
                        <td>{moment(fechaModificacion).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn btn-xs btn-info" onClick={() => onEditClicked(warehouse)}>Editar</button>
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
          <label htmlFor="warehouse">Almacen</label>
          <input ref={warehouseRef} name="warehouse" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Direccion</label>
          <textarea ref={addressRef} name="address" className="form-control" rows={3} />
        </div>
      </Modal>
    </BaseTemplate>
  )
}

export default WarehousesPage