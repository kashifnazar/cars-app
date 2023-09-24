import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cars from '../containers/Cars'
import FourOhFour from '../pages/404'
import Login from '../containers/Login'
import Home from '../pages/Home'
import { Protected } from './protected'

function AppRoutes() {
	return (
		<Routes>
			<Route path='/' Component={Home}/>
			<Route path="/login" Component={Login}/>
			
			<Route path="/" element={<Protected />}>
				<Route path="/cars" Component={Cars} />
			</Route>

			<Route path='*' element={<FourOhFour />} />
		</Routes>	
	)
}

export default AppRoutes