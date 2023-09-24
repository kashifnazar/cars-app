import client from '../helpers/axios'
import { useMutation } from 'react-query'


type Props = {
    endpoint: string
    onSuccess?: () => void
}

function useSave<V>({ endpoint, onSuccess }: Props) {

	const { mutate: post } = useMutation<unknown, unknown, V>({

		mutationFn: async (variables: V) => {
            
			//If the entity contains an id, send a PUT request to :/id with the endpoint. Otherwise send a POST request to the endpoint
			// const url = variables.id ? [endpoint, variables.id].join('/') : endpoint
    
			// let response 
    
			// if(variables.id) 
			// 	response = await axios.put(url, variables)
			// else 
			const response = await client.post('/api/' + endpoint, variables)
    
			const {data} = response
    
			return data
		},
		onSuccess(data, variables, context) {
			onSuccess?.()
		},
	})

	return { save: post}
}

export default useSave

