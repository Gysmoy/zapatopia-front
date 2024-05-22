import { Fetch } from "sode-extend-react";
import { API_URL } from "../Settings";

class WarehousesRest {
  static all = async () => {
    const { result } = await Fetch(`${API_URL}/warehouses/`)
    return result?.data ?? []
  }
  static get = async (id) => {
    const { result } = await Fetch(`${API_URL}/warehouses/${id}`)
    return result?.data ?? null
  }
  static save = async (data) => {
    const { result } = await Fetch(`${API_URL}/warehouses/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return result?.data ?? null
  }
  static delete = async (id) => {
    const { result } = await Fetch(`${API_URL}/warehouses/${id}`, { method: 'DELETE' })
    return result?.data ?? null
  }
}

export default WarehousesRest;