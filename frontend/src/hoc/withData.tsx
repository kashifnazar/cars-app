import React, { useState } from 'react'
import axios from 'axios'
import DataTable, { SaveConfig } from '../components/DataTable'
import { useMutation, useQuery } from 'react-query'
import useGet from '../hooks/useGet'
import { useMemo  } from 'react'
import { TableColumnsType } from 'antd'
import { Step } from '../components/Wizard'
import useSave from '../hooks/useSave'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL

type WithDataProps<T, V> = {
    endpoint: string
    entityName: string
    columns: TableColumnsType<T>
	steps: Array<Step> //TODO: Remove this out
	renderSummary: (values: V) => JSX.Element
	dialogHeight?: string //This doesn't belong here
}

function withData<T extends Record<PropertyKey, any>, FormValue>({ endpoint, entityName, columns, steps, renderSummary, dialogHeight}: WithDataProps<T, FormValue>){

	function Component() {

		const { data, isLoading, refetch, error } = useGet<T>({ endpoint })
		const { save } = useSave<FormValue>({
			endpoint,
			onSuccess: refetch
		})

		// Construct save config to be passed to the DataTable
		const saveConfig = useMemo<SaveConfig<FormValue>>(() => {
			return {
				createLabel: 'New ' + entityName,
				async onSave(value: FormValue) {
					save({...value} as FormValue)
				},
				renderSummary,
				minHeight: dialogHeight,
				steps
			}
		}, [])


		if(error) return <div>There was an error</div>

		return <DataTable<T, FormValue> title={entityName} 
			dataSource={data || []} 
			columns={columns} 
			save={saveConfig} 
			isLoading={isLoading}
		/>
	}

	return Component
}

export default withData
