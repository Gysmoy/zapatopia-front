import { Fetch } from "sode-extend-react";
import { API_URL } from "../Settings";

class ProductsRest {
  static all = async () => {
    const { result } = await Fetch(`${API_URL}/products/`)
    return result?.data ?? []
  }
  static get = async (id) => {
    const { result } = await Fetch(`${API_URL}/products/${id}`)
    return result?.data ?? null
  }
  static getByListId = async (listId) => {
    const { result } = await Fetch(`${API_URL}/products/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listId)
    })
    return result?.data ?? []

  }
  static save = async (data) => {
    const { result } = await Fetch(`${API_URL}/products/`, {
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
    const { result } = await Fetch(`${API_URL}/products/${id}`, { method: 'DELETE' })
    return result?.data ?? null
  }
}

export default ProductsRest;