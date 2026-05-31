import axios from 'axios'

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')
const API_BASE_URL = configuredApiBaseUrl || (import.meta.env.DEV ? 'http://127.0.0.1:8000' : '')

// Central Axios client used by all pages to communicate with the FastAPI backend.
export const api = axios.create({
  baseURL: API_BASE_URL,
})

export const createComplaint = (payload) => api.post('/complaint', payload)
export const getComplaint = (id) => api.get(`/complaint/${id}`)
export const getComplaints = (params = {}) => api.get('/complaints', { params })
export const updateComplaint = (id, status) => api.put(`/complaint/${id}`, { status })
export const getStats = () => api.get('/stats')
