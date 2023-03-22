import axios from 'axios'
import { csrftoken } from './csrftoken'

export const register = async (value) => await fetch("http://localhost:2310/create_permission",{
    credentials: 'same-origin',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'X-CSRFToken': csrftoken
    },
    body: JSON.stringify(value)
})

export const searchPermission = async (permission) => await axios.get(`http://localhost:2310/permissions/${permission}`)
export const getPermission = async (permission) => await axios.get(`http://localhost:2310/permission/${permission}`)
export const getPermissions = async () => await axios.get(`http://localhost:2310/permissions`)