import axios, { AxiosRequestConfig } from 'axios'
import { getLocal } from '../encrypt'

const baseUrl = process.env.REACT_APP_API_URL

export async function AxiosPost<T>(url: string, data: any): Promise<T> {
  const token = await getLocal('token', []);
  let config: AxiosRequestConfig = {
    headers: { 'Authorization': `Bearer ${token}` },
  }
  const response = await axios.post<T>(baseUrl + url, data, config)
  return response.data
}
