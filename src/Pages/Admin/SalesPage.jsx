import moment from "moment-timezone";
import BaseTemplate from "../../BaseTemplate";
import { useEffect, useRef, useState } from "react";
import SalesRest from "../../Rest/SalesRest";
import Modal from "../../Components/Modal";
import StatesRest from "../../Rest/StatesRest";
import ReactSelect from "react-select";

moment.tz.setDefault("America/Lima");
moment.locale("es");

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [modalTittle, setModalTittle] = useState("Gestionar venta");
  const [id, setId] = useState(null);
  const [detailSale, setDetilSale] = useState([]);

  const modalRef = useRef();
  const codeRef = useRef();
  const typeDocRef = useRef();
  const numDocRef = useRef();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const mothLastNameRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const notifyRef = useRef();
  const mediaRef = useRef();
  const stateRef = useRef();
  const dateRef = useRef();

  const $ = window.$;

  useEffect(() => {
    document.title = "Ventas";
    loadSales();
    loadStates();
  }, []);

  const loadSales = () => {
    SalesRest.all().then((data) => {
      setSales(data);
    });
  };
  const loadStates = () => {
    StatesRest.all().then((data) => {
      setStates(data);
    });
  };

  const handleChange = (selectedOption) => {
    setSelectedState(selectedOption);
    stateRef.current.value = states.find(state => state.id === selectedOption.value);
  };

  const resetForm = () => {
    modalRef.current.reset();
  };

  const onModalSubmit = (e) => {
    e.preventDefault()

    const request = {
        idVenta: id || undefined,
        estado: stateRef.current.value.id
    }

    console.log(request);
    SalesRest.updateState(request).then(() => {
        resetForm()
        $(modalRef.current).modal('hide')
        loadSales()
    });
  };

  const onManageClicked = (sale) => {
    console.log(sale);
    resetForm();
    setId(sale.id);
    setDetilSale(sale.detalle);
    codeRef.current.value = sale.codigoPedido;
    typeDocRef.current.value = sale.cliente.tipoDocumento;
    numDocRef.current.value = sale.cliente.numeroDocumento;
    nameRef.current.value = sale.cliente.nombres;
    lastNameRef.current.value = sale.cliente.apellidoPaterno;
    mothLastNameRef.current.value = sale.cliente.apellidoMaterno;
    addressRef.current.value = sale.cliente.direccion;
    emailRef.current.value = sale.cliente.correoElectronico;
    phoneRef.current.value = sale.cliente.numeroCelular;
    notifyRef.current.value = sale.cliente.flagNotificar ? "Si" : "No";
    mediaRef.current.value = sale.cliente.medioPreferido;
    stateRef.current.value = sale.estado;
    dateRef.current.value = moment(sale.fechaModificacion).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    setSelectedState({ value: sale.estado.id, label: sale.estado.estado });
    $(modalRef.current).modal("show");
  };

  return (
    <BaseTemplate title="Ventas">
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h4 className="header-title mt-0 mb-0">Lista de ventas</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-centered table-bordered mb-0"
              id="btn-editable"
            >
              <thead className="table-light">
                <tr>
                  <th>Codigo venta</th>
                  <th>Tipo documento</th>
                  <th>Numero documento</th>
                  <th>Nombres</th>
                  <th>Apellido paterno</th>
                  <th>Apellido materno</th>
                  <th>Direccion</th>
                  <th>Correo electronico</th>
                  <th>Numero celular</th>
                  <th>Notificar</th>
                  <th>Medio comunicacion</th>
                  <th>Estado</th>
                  <th>Fecha de actualización</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => {
                  const {
                    id,
                    codigoPedido,
                    cliente: {
                      tipoDocumento,
                      numeroDocumento,
                      nombres,
                      apellidoPaterno,
                      apellidoMaterno,
                      direccion,
                      correoElectronico,
                      numeroCelular,
                      flagNotificar,
                      medioPreferido,
                    },
                    estado,
                    fechaModificacion,
                  } = sale;

                  return (
                    <tr key={`sale-${id}`}>
                      <td>{codigoPedido}</td>
                      <td>{tipoDocumento}</td>
                      <td>{numeroDocumento}</td>
                      <td>{nombres}</td>
                      <td>{apellidoPaterno}</td>
                      <td>{apellidoMaterno}</td>
                      <td>{direccion}</td>
                      <td>{correoElectronico}</td>
                      <td>{numeroCelular}</td>
                      <td>{flagNotificar ? "Si" : "No"}</td>
                      <td>{medioPreferido}</td>
                      <td>{estado.descripcion}</td>
                      <td>
                        {moment(fechaModificacion).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-xs btn-info"
                            onClick={() => onManageClicked(sale)}
                          >
                            Gestionar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        title={modalTittle}
        modalRef={modalRef}
        handleSubmit={onModalSubmit}
        size="lg"
      >
        <div className="row">
          <div className="form-group col-12 mb-2">
            <label htmlFor="txtCodigoPedido">Codigo</label>
            <input
              ref={codeRef}
              type="text"
              id="txtCodigoPedido"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-6 mb-2">
            <label htmlFor="txtTipoDocumento">Tipo de documento</label>
            <input
              ref={typeDocRef}
              type="text"
              id="txtTipoDocumento"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-6 mb-2">
            <label htmlFor="txtNumeroDocumento">Numero de documento</label>
            <input
              ref={numDocRef}
              type="text"
              id="txtNumeroDocumento"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-4 mb-2">
            <label htmlFor="txtNombres">Nombres</label>
            <input
              ref={nameRef}
              type="text"
              id="txtNombres"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-4 mb-2">
            <label htmlFor="txtApellidoPaterno">Apellido paterno</label>
            <input
              ref={lastNameRef}
              type="text"
              id="txtApellidoPaterno"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-4 mb-2">
            <label htmlFor="txtApellidoMaterno">Apellido materno</label>
            <input
              ref={mothLastNameRef}
              type="text"
              id="txtApellidoMaterno"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-6 mb-2">
            <label htmlFor="direccion">Direccion</label>
            <input
              ref={addressRef}
              type="text"
              id="direccion"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-6 mb-2">
            <label htmlFor="txtEmail">Correo electronico</label>
            <input
              ref={emailRef}
              type="text"
              id="txtEmail"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-4 mb-2">
            <label htmlFor="txtNumeroCelular">Numero celular</label>
            <input
              ref={phoneRef}
              type="text"
              id="txtNumeroCelular"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-4 mb-2">
            <label htmlFor="txtNotificar">Notificar</label>
            <input
              ref={notifyRef}
              type="text"
              id="txtNotificar"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-4 mb-2">
            <label htmlFor="txtMedio">Medio de comunicacion</label>
            <input
              ref={mediaRef}
              type="text"
              id="txtMedio"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
          <div className="form-group col-6 mb-2">
            <label htmlFor="txtEstado">Estado</label>
            <ReactSelect
              id="txtEstado"
              ref={stateRef}
              value={selectedState}
              onChange={handleChange}
              options={states.map(({ id, estado }) => ({
                value: id,
                label: estado,
              }))}
            />
          </div>
          <div className="form-group col-6 mb-2">
            <label htmlFor="txtFechaActualizacion">
              Fecha de actualizacion
            </label>
            <input
              ref={dateRef}
              type="text"
              id="txtFechaActualizacion"
              className="form-control form-control-sm"
              readOnly
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <b htmlFor="">Stock y precio x almacen</b>
            <table className="table table-sm table-bordered mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Marca</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detailSale.map(
                  ({
                    id,
                    producto: {
                      id: idProducto,
                      marca: { descripcion: desMarca },
                      nombre,
                    },
                    precio,
                    cantidad,
                  }) => {
                    return (
                      <tr key={`detail-${id}`}>
                        <td>{idProducto}</td>
                        <td>{desMarca}</td>
                        <td>{nombre}</td>
                        <td>S/ {precio}</td>
                        <td>{cantidad}</td>
                        <td>S/ {precio * cantidad}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </BaseTemplate>
  );
};

export default SalesPage;
