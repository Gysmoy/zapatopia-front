import { Fetch } from "sode-extend-react";
import { API_URL } from "../Settings";
import { toast } from "react-toastify";

class OffersRest {
    static all = async () => {
        try {
            const response = await Fetch(`${API_URL}/offers/`);
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

    static save = async (data) => {
        try {
            const response  = await Fetch(`${API_URL}/offers/`, {
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


    static delete = async (id) => {
        try {
            const response  = await Fetch(`${API_URL}/offers/${id}`, {
                method: 'DELETE'
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

    static send = async (id) => {
        try {
            const response  = await Fetch(`${API_URL}/offers/send/email/${id}`, {
                method: 'PATCH'
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

}

export default OffersRest;