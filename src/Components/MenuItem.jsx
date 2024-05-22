import { Link } from "react-router-dom"

const MenuItem = ({ href, icon, children }) => {
  return (
    <li>
      <Link to={href}>
        <i className={icon}></i>
        <span> {children} </span>
      </Link>
    </li>
  )
}

export default MenuItem