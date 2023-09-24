import axios from 'axios'


const client = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	headers: {
		Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token') ?? '')
	}
})

client.interceptors.response.use(function (response) {
	return response
}, function (error) {
	return Promise.reject(error)
})


export default client