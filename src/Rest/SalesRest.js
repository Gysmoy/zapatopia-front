import { Fetch } from "sode-extend-react";
import { API_URL } from "../Settings";
import { toast } from "react-toastify";

class SalesRest {

    static generate = async (data) => {
        try {
            const response  = await Fetch(`${API_URL}/sales/`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.status) {
                throw new Error('Fallo en la peticion');
            }
            
            const result = await response.result;
    
            toast.success('Operacion exitosa', {
                position: "top-right",
                autoClose: 3000
            });
    
            return result?.data ?? null

        } catch (error) {
            console.error('Error:', error);
            toast.error('Error en la peticion', {
              position: "top-right",
              autoClose: 3000
            });      
            return null;
        }
    }

    static all = async () => {
        try {
            const response = await Fetch(`${API_URL}/sales/`);
            if (!response.status) {
                throw new Error('Fallo en la peticion');
            }
            const result = await response.result;
            return result?.data ?? []
            
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error en la peticion', {
              position: "top-right",
              autoClose: 3000
            });      
            return null;
        }
    }

    static updateState = async (data) => {
        try {
            const response  = await Fetch(`${API_URL}/sales/${data.idVenta}`, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({estado: {id: data.estado}})
            });

            if (!response.status) {
                throw new Error('Fallo en la peticion');
            }
            
            const result = await response.result;
    
            if (result.status === 204) {
                throw new Error('Venta no encontrada');
            }

            toast.success('Operacion exitosa', {
                position: "top-right",
                autoClose: 3000
            });
    
            return result?.data ?? null

        } catch (error) {
            console.error('Error:', error);
            toast.error('Error en la peticion', {
              position: "top-right",
              autoClose: 3000
            });      
            return null;
        }
    }


}

export default SalesRest