import client from '../helpers/axios'
import { useQuery } from 'react-query'

type Props = {
    endpoint: string
}

function useGet<T>({ endpoint }: Props) {
	const { data, isLoading, refetch, error } = useQuery<Array<T>>({
		queryKey: endpoint,
		queryFn: async () => {

			const url =  '/api/' + endpoint
			const { data } = await client.get(url)
			return data
		}
	})

	return {data, isLoading, refetch, error}
}

export default useGet