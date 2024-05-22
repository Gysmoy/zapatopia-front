const Modal = ({ title, modalRef = null, children, size = 'sm', handleSubmit = () => { } }) => {
  return (
    <form ref={modalRef} className="modal fade" tabIndex={-1} role="dialog"
      aria-labelledby="standard-modalLabel" aria-hidden="true" onSubmit={handleSubmit}>
      <div className={`modal-dialog modal-dialog-centered modal-${size}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 name="title" className="modal-title" id="standard-modalLabel">{title}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="reset" className="btn btn-xs btn-danger"
              data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" className="btn btn-xs btn-primary">Aceptar</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Modal