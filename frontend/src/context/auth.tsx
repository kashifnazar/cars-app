import React, { PropsWithChildren, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import client from '../helpers/axios'

const AuthContext = createContext({
	token: '',
	login: (token: string) => {
		console.log()
	}
})

export const AuthProvider = ({ children }: PropsWithChildren) => {

	const [token, setToken] = useLocalStorage<string>('token', null) as [string, (token: string) => void]
	const navigate = useNavigate()

	// call this function when you want to authenticate the user
	function login(token: string){
		setToken(token)
		client.defaults.headers['Authorization'] = 'Bearer ' + token
		navigate('/cars')
	}

	const value = {
		token,
		login
	}
	
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	return useContext(AuthContext)
}