import client from '../helpers/axios'
import { useMutation } from 'react-query'

export type LoginRequest = {
	username: string
	password: string
}

type Props = {
    onSuccess: (token: string) => void
	onFailed: () => void
}

function useLogin({ onFailed, onSuccess }: Props) {

	const { mutate: login } = useMutation<string, unknown, LoginRequest>({

		mutationFn: async (user) => {
			const response = await client.post('/login', user)
			const { data } = response
			return data
		},
		onSuccess(token) {
			onSuccess(token)
		},
		onError() {
			onFailed()
		}
	})

	return { login }
}

export default useLogin

