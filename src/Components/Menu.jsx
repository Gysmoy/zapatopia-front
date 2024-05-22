import MenuItem from "./MenuItem"
import MenuItemContainer from "./MenuItemContainer"

const Menu = () => {
  return (
    <div className="left-side-menu">

      <div className="h-100" data-simplebar>


        <div className="user-box text-center">

          <img src="/lte/assets/images/users/user-1.jpg" alt="user-img" title="Mat Helme"
            className="rounded-circle img-thumbnail avatar-md" />
          <div className="dropdown">
            <a href="#" className="user-name dropdown-toggle h5 mt-2 mb-1 d-block" data-bs-toggle="dropdown"
              aria-expanded="false">Manuel Gamboa</a>
            <div className="dropdown-menu user-pro-dropdown">

              <a href="#" className="dropdown-item notify-item">
                <i className="fe-user me-1"></i>
                <span>Mi Cuenta</span>
              </a>

              <a href="#" className="dropdown-item notify-item">
                <i className="fe-settings me-1"></i>
                <span>Configuración</span>
              </a>

              <a href="#" className="dropdown-item notify-item">
                <i className="fe-lock me-1"></i>
                <span>Bloqueo</span>
              </a>

              <a href="#" className="dropdown-item notify-item">
                <i className="fe-log-out me-1"></i>
                <span>Cerrar Sesión</span>
              </a>

            </div>
          </div>

          <p className="text-muted left-user-info">Administrador</p>

          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#" className="text-muted left-user-info">
                <i className="mdi mdi-cog"></i>
              </a>
            </li>

            <li className="list-inline-item">
              <a href="#">
                <i className="mdi mdi-power"></i>
              </a>
            </li>
          </ul>
        </div>
        <div id="sidebar-menu">
          <ul id="side-menu">

            <li className="menu-title">Dashboard</li>
            <MenuItem href='/admin/' icon='mdi mdi-view-dashboard'>Inicio</MenuItem>
            <MenuItem href='/admin/trazability' icon='mdi mdi-graph'>Trazabilidad</MenuItem>
            <MenuItem href='/admin/ventas' icon='mdi mdi-sale'>Ventas</MenuItem>

            <li className="menu-title">Configuración</li>
            <MenuItem href='/admin/productos' icon='mdi mdi-store' >Productos</MenuItem>
            <MenuItem href='/admin/brands' icon='mdi mdi-storefront'>Marcas</MenuItem>
            <MenuItem href='/admin/categories' icon='mdi mdi-format-list-bulleted-type'>Categorías</MenuItem>

            <MenuItemContainer title='Inventario' icon='mdi mdi-layers'>
              <MenuItem href='/admin/warehouse' icon='mdi mdi-warehouse'>Almacenes</MenuItem>
            </MenuItemContainer>

            <MenuItem href='/admin/concepts' icon='mdi mdi-page-next'>Conceptos</MenuItem>
            <MenuItem href='/admin/users' icon='mdi mdi-contacts'>Usuarios y Roles</MenuItem>
          </ul>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
  )
}

export default Menu