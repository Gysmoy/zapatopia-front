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

      {/* Modals */}

      <div class="modal fade" id="custom-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-light">
              <h4 class="modal-title" id="myCenterModalLabel">Agregar Usuario</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body">
              <form id="form-agregar-usuario">
                <div class="mb-3">
                  <label for="usuario" class="form-label">Nombre del Usuario</label>
                  <input type="text" class="form-control" id="usuario-create"
                    placeholder="Ingresa nombre de usuario"/>
                </div>
                <div class="mb-3">
                  <label for="contrasena" class="form-label">Contraseña del Usuario</label>
                  <input type="password" class="form-control" id="contrasena-create"
                    placeholder="Ingresa contraseña"/>
                </div>
                <div class="mb-3">
                  <label for="correo" class="form-label">Correo del Usuario</label>
                  <input type="text" class="form-control" id="correo-create" placeholder="Ingresa el correo"/>
                </div>
                <div class="mb-3">
                  <label for="persona" class="form-label">Persona</label>
                  <div class="me-sm-2">
                    <select class="form-select my-1 my-md-0" id="status-select-persona">
                      <option selected="">Elije una persona</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="rol" class="form-label">Rol</label>
                  <div class="me-sm-2">
                    <select class="form-select my-1 my-md-0" id="status-select-rol">
                      <option selected="">Elije un rol</option>
                    </select>
                  </div>
                </div>
                <button type="button" class="btn btn-light waves-effect waves-light" id="create-usuario"
                  onclick="guardarUsuario()">Guardar</button>
                <button type="button" class="btn btn-danger waves-effect waves-light"
                  data-bs-dismiss="modal">Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="custom-modal-editar-usuario" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-light">
              <h4 class="modal-title" id="myCenterModalLabel">Editar Usuario</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body">
              <form id="form-editar-usuario">
                <input type="hidden" id="id-usuario-editar"/>
                  <div class="mb-3">
                    <label for="usuario" class="form-label">Nombre del Usuario</label>
                    <input type="text" class="form-control" id="usuario-editar"
                      placeholder="Ingresa nombre de usuario"/>
                  </div>
                  <div class="mb-3">
                    <label for="contrasena" class="form-label">Contraseña del Usuario</label>
                    <input type="password" class="form-control" id="contrasena-editar"
                      placeholder="Ingresa contraseña"/>
                  </div>
                  <div class="mb-3">
                    <label for="correo" class="form-label">Correo del Usuario</label>
                    <input type="text" class="form-control" id="correo-editar" placeholder="Ingresa el correo"/>
                  </div>
                  <div class="mb-3">
                    <label for="persona" class="form-label">Persona</label>
                    <div class="me-sm-2">
                      <select class="form-select my-1 my-md-0" id="status-select-persona-editar">
                        <option selected="">Elije una persona</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="rol" class="form-label">Rol</label>
                    <div class="me-sm-2">
                      <select class="form-select my-1 my-md-0" id="status-select-rol-editar">
                        <option selected="">Elije un rol</option>
                      </select>
                    </div>
                  </div>
                  <button type="button" class="btn btn-light waves-effect waves-light" id="editar-usuario"
                    onclick="actualizarUsuario()">Guardar</button>
                  <button type="button" class="btn btn-danger waves-effect waves-light"
                    data-bs-dismiss="modal">Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="custom-modal-rol" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-light">
              <h4 class="modal-title" id="myCenterModalLabel">Nuevo Rol </h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="name1" class="form-label">Nombre de Rol</label>
                    <input type="text" class="form-control" id="name-rol"
                      placeholder="Ingresa el nombre de rol"/>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="name2" class="form-label">Descripción de Rol</label>
                    <input type="text" class="form-control" id="descripcion-rol"
                      placeholder="Ingresa la descripción de rol"/>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="position" class="form-label">Permisos</label>
                  <div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="permiso1"/>
                        <label class="form-check-label" for="permiso1">
                          Inicio
                        </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="permiso2"/>
                        <label class="form-check-label" for="permiso2">
                          Trazabilidad
                        </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="permiso3"/>
                        <label class="form-check-label" for="permiso3">
                          Ventas
                        </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="permiso4"/>
                        <label class="form-check-label" for="permiso4">
                          Productos
                        </label>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="permiso5"/>
                        <label class="form-check-label" for="permiso5">
                          Marcas
                        </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="permiso6"/>
                        <label class="form-check-label" for="permiso6">
                          Categorias
                        </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="permiso7"/>
                        <label class="form-check-label" for="permiso7">
                          Conceptos
                        </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="permiso8"/>
                        <label class="form-check-label" for="permiso8">
                          Usuarios y Roles
                        </label>
                    </div>
                  </div>
                </div>

                <button type="button" class="btn btn-light waves-effect waves-light" onclick="guardarNuevoRol()">Guardar</button>
                <button type="button" class="btn btn-danger waves-effect waves-light"
                  data-bs-dismiss="modal">Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </BaseTemplate>
  )
}

export default UsersPage