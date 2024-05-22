import { useRef } from 'react'
import zapatopia from '../Assets/img/zapatopia.svg'
import { Fetch } from 'sode-extend-react'
import { API_URL } from '../Settings'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const LoginPage = () => {

  const loginRef = useRef(null)

  const onLoginSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(loginRef.current)
    const request = {
      usuario: formData.get('username'),
      contrasenia: formData.get('password')
    }

    const { status, result } = await Fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    })

    // if (!status) Swal.fire({
    //   icon: 'error',
    //   title: 'Credenciales incorrectas',
    //   text: result?.message ?? 'Error inesperado al iniciar sesión.'
    // })
    // else
   window.location.href = '/admin/'
  }

  return (
    <div class="account-pages my-5">
      <div class="container">

        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-4">
            <div class="text-center">
              <img className='mb-4' src={zapatopia} alt="Logo Zapatopia" height={125} />
            </div>
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mb-4">
                  <h4 class="text-uppercase mt-0">Login</h4>
                </div>
                <form ref={loginRef} id="login-form" onSubmit={onLoginSubmit}>
                  <div class="mb-3">
                    <label for="emailaddress" class="form-label">Usuario</label>
                    <input class="form-control" type="text" id="username" required=""
                      placeholder="Ingresa tu usuario" />
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input class="form-control" type="password" required="" id="password"
                      placeholder="Ingresa tu contraseña" />
                  </div>
                  <div class="mb-3 d-grid text-center">
                    <button class="btn btn-primary" type="submit"> Ingresar </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage