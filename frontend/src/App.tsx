import React from 'react'
import AppRoutes from './routes'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {

	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<ConfigProvider
				theme={{
					components: {
						Button: {
							colorPrimary: '#0AAB67',
							borderRadius: 6,
							algorithm: true, // Enable algorithm
						},
						Input: {
							colorPrimary: '#eb2f96',
							algorithm: true, // Enable algorithm
						}
					},
				}}
			>
				<BrowserRouter>
					<div className='app-container'>
						<AppRoutes />
					</div>
				</BrowserRouter>
			</ConfigProvider>
		</QueryClientProvider>
	)
}

export default App