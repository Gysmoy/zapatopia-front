import Footer from "./Components/Footer"
import Menu from "./Components/Menu"
import NavBar from "./Components/NavBar"

const BaseTemplate = ({ title = 'Inicio', children }) => {
  return (<>
    <NavBar title={title} />
    <Menu />
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  </>)
}

export default BaseTemplate