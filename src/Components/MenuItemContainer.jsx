const MenuItemContainer = ({ title, icon, children }) => {
  const id = `item-${crypto.randomUUID()}`
  return (
    <li>
      <a href={`#${id}`} data-bs-toggle="collapse">
        <i class={icon}></i>
        <span> {title} </span>
        <span class="menu-arrow"></span>
      </a>
      <div class="collapse" id={id}>
        <ul class="nav-second-level">
          {children}
        </ul>
      </div>
    </li>
  )
}

export default MenuItemContainer