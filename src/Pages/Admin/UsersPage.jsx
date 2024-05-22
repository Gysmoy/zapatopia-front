import BaseTemplate from "../../BaseTemplate"

const UsersPage = () => {
  return (
    <BaseTemplate title="Usuarios y roles">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-between">
                <div className="col-md-4">
                  <div className="mt-3 mt-md-0 gap-1">
                    <button type="button" className="btn btn-success waves-effect waves-light"
                      data-bs-toggle="modal" data-bs-target="#custom-modal"><i
                        className="mdi mdi-plus-circle me-1"></i> Agregar Usuario</button>

                    <button type="button" className="btn btn-success waves-effect waves-light"
                      data-bs-toggle="modal" data-bs-target="#custom-modal-rol"><i
                        className="mdi mdi-plus-circle me-1"></i> Nuevo Rol</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-centered mb-0" id="btn-editable">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Usuario</th>
                      <th>Nombre</th>
                      <th>Rol</th>
                      <th>Fecha</th>
                      <th>Accion</th>
                    </tr>
                  </thead>

                  <tbody id="table-body">
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseTemplate>
  )
}

export default UsersPage