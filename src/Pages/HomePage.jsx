import { Link } from 'react-router-dom'
import '../Assets/css/Home.css'
import zapatopia from '../Assets/img/zapatopia.svg'

const HomePage = () => {
  return (
    <>
      <main id='home-page'>
        <header>
          <h1>Zapatopia</h1>
        </header>
        <div className="logo-container">
          <img src={zapatopia} alt="Zapatopia Logo" className="logo" />
        </div>
        <h2>Las mejores zapatilla a solo un clic de distancia</h2>
        <div className="search-container">
          <input type="text" id="search" name="search" placeholder="Que talla estas buscando?" />
          <Link to="/filters" type="button">Buscar</Link>
        </div>
      </main>
    </>
  )
}

export default HomePage