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
        <h2>Las mejores zapatillas a solo un clic de distancia</h2>
        <div className="search-container">
          <input type="text" placeholder="Cual es tu talla..." className="search-input" />
          <a href="/filter">Empezar</a>
        </div>
      </main>
    </>
  )
}

export default HomePage