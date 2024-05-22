import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <script>{new Date().getFullYear()}</script> &copy; Zapatopia 1.0.0 by <a
              href="//about.sode.me" target="_blank" rel="noopener noreferrer">SoDe World</a>
          </div>
          <div className="col-md-6">
            <div className="text-md-end footer-links d-none d-sm-block">
              <Link to="./">Inicio</Link>
              <Link to="./sales">Ventas</Link>
              <Link to="./trazability">Trazabilidad</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer