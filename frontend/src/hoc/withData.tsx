import React from 'react'
import axios from 'axios'
import DataTable, { SaveConfig } from '../components/DataTable'
import { useMutation, useQuery } from 'react-query'
import { useMemo  } from 'react'
import { TableColumnsType } from 'antd'
import { Step } from '../components/Wizard'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL

type WithDataProps<T, V> = {
    endpoint: string
    entityName: string
    columns: TableColumnsType<T>
	steps: Array<Step> //TODO: Remove this out
	renderSummary: (values: V) => JSX.Element
}

function withData<T extends Record<PropertyKey, any>, V>({ endpoint, entityName, columns, steps, renderSummary}: WithDataProps<T, V>){

	function Component() {

		const { data, isLoading, refetch, error } = useQuery<Array<T>>({
			queryKey: endpoint,
			queryFn: async () => {

				const url =  endpoint

				const { data } = await axios.get(url)
				return data
			}
		})

		const { mutate } = useMutation<T, unknown, V>({

			mutationFn: async (variables: V) => {
                
				//If the entity contains an id, send a PUT request to :/id with the endpoint. Otherwise send a POST request to the endpoint
				// const url = variables.id ? [endpoint, variables.id].join('/') : endpoint

				// let response 

				// if(variables.id) 
				// 	response = await axios.put(url, variables)
				// else 
				const response = await axios.post(endpoint, variables)

				const {data} = response

				return data
			},
			onSuccess(data, variables, context) {
				refetch()
			},
		})

		// Construct save config to be passed to the DataTable
		const saveConfig = useMemo<SaveConfig<V>>(() => {
			return {
				createLabel: 'New ' + entityName,
				async onSave(value: V) {
					mutate({...value} as V)
				},
				renderSummary,
				steps
			}
		}, [mutate])


		if(error) return <div>There was an error</div>

		return <DataTable<T, V> title={entityName} 
			dataSource={data || []} 
			columns={columns} 
			save={saveConfig} 
			isLoading={isLoading}/>
	}

	return Component
}

export default withData
