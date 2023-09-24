import axios from 'axios'
import { log } from 'console'


const client = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	headers: {
		Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token') ?? '""')
	}
})

client.interceptors.response.use(function (response) {
	return response
}, function (error) {
	
	if(error?.response?.status === 403) {
		localStorage.removeItem('token')
		window.location.href = '/cars'
	}
	return Promise.reject(error)
})


export default client