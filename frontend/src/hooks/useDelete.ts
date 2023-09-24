import client from '../helpers/axios'
import { useMutation } from 'react-query'

type Props = {
    endpoint: string
	onError?: () => void
	onSuccess?: () => void
}

function useDelete({ endpoint, onSuccess, onError }: Props) {
	const { mutateAsync } = useMutation<void, void, number>({
		mutationKey: endpoint,
		async mutationFn(id: number) {
			const url =  '/api/' + endpoint + '/' + id
			const { data } = await client.delete(url)
			return data
		},
		onSuccess,
		onError
	})

	return { remove: mutateAsync }
}

export default useDelete