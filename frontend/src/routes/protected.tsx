import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'
import { useAuth } from '../context/auth'

export const Protected = () => {
	
	const { token } = useAuth()
	const outlet = useOutlet()
  
	if (!token) {
		return <Navigate to="/login" />
	}
  
	return (
		<div>
			{outlet}
		</div>
	)
}