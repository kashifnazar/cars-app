import { QueryClient, QueryClientProvider } from 'react-query'
import Cars from './containers/Cars'
import { ConfigProvider } from 'antd'
import React from 'react'

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
				<Cars />
			</ConfigProvider>
		</QueryClientProvider>
	)
}

export default App