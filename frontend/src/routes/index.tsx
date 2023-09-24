import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cars from '../containers/Cars'
import FourOhFour from '../containers/404'
import Login from '../containers/login'

function AppRoutes() {
	return (
		<Routes>
			<Route path="/cars" element={<Cars />} />
			<Route path="/login" Component={Login}/>
			<Route path='*' element={<FourOhFour />} />
		</Routes>
	)
}

export default AppRoutes