import { Fetch } from "sode-extend-react";
import { API_URL } from "../Settings";

class BrandsRest {
  static all = async () => {
    const { result } = await Fetch(`${API_URL}/brands/`)
    return result?.data ?? []
  }
  static get = async (id) => {
    const { result } = await Fetch(`${API_URL}/brands/${id}`)
    return result?.data ?? null
  }
  static save = async (data) => {
    const { result } = await Fetch(`${API_URL}/brands/`, {
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
    const { result } = await Fetch(`${API_URL}/brands/${id}`, { method: 'DELETE' })
    return result?.data ?? null
  }
}

export default BrandsRest;