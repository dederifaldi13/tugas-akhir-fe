import axios, { AxiosRequestConfig } from 'axios'
import { getLocal } from '../encrypt'
import CryptoJS from 'crypto-js'

const baseUrl = process.env.REACT_APP_API_URL
const baseUrliPaymu = process.env.REACT_APP_IPAYMU_API_URL

export async function AxiosPost<T>(url: string, data: any): Promise<T> {
  const token = await getLocal('token', []);
  let config: AxiosRequestConfig = {
    headers: { 'Authorization': `Bearer ${token}` },
  }
  const response = await axios.post<T>(baseUrl + url, data, config)
  return response.data
}

export async function AxiosPostiPayMu<T>(url: string, data: any): Promise<T> {

  const va = process.env.REACT_APP_IPAYMU_VA
  const apikey = process.env.REACT_APP_IPAYMU_API_KEY || '-'

  var bodyEncrypt = CryptoJS.SHA256(JSON.stringify(data));
  var stringtosign = "POST:" + va + ":" + bodyEncrypt + ":" + apikey
  var signature = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, apikey))

  let config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/json', 'va': va, 'signature': signature, 'timestamp': '20191209155701' },
  }
  const response = await axios.post<T>(baseUrliPaymu + url, data, config)
  return response.data
}
