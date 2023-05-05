import axios from 'axios'

const base_url = 'http://192.168.128.52:3001/api'

export const api = axios.create({
  baseURL: base_url,
})

export { base_url }
