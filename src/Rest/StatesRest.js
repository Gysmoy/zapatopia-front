import { Fetch } from "sode-extend-react";
import { API_URL } from "../Settings";
import { toast } from "react-toastify";


class StatesRest {

    static all = async () => {
        try {
            const response = await Fetch(`${API_URL}/states/`);
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

}

export default StatesRest
