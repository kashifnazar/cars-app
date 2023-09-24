import React from 'react'
import DataTable, { SaveConfig } from '../components/DataTable'
import useGet from '../hooks/useGet'
import { useMemo  } from 'react'
import { Button, Space, TableColumnsType } from 'antd'
import { Step } from '../components/Wizard'
import useSave from '../hooks/usePost'
import { DeleteOutlined, EditFilled } from '@ant-design/icons'
import useDelete from '../hooks/useDelete'

type WithDataProps<T, V> = {
	title?: string
    endpoint: string
    entityName: string
    columns: TableColumnsType<T>
	steps: Array<Step> //TODO: Remove this out
	renderSummary: (values: V) => JSX.Element
	dialogHeight?: string //This doesn't belong here
}

function withData<T extends Record<PropertyKey, any>, FormValue>({ title, endpoint, entityName, columns, steps, renderSummary, dialogHeight }: WithDataProps<T, FormValue>){

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

		const { remove } = useDelete({
			endpoint,
		})

		async function onDelete(id: number) {
			await remove(id)
			refetch()
		}

		if(error) return <div>There was an error</div>

		return <DataTable<T, FormValue> 
			title={title} 
			columns={columns}
			save={saveConfig} 
			onDelete={onDelete}
			isLoading={isLoading}
			dataSource={data || []} 
		/>
	}

	return Component
}

export default withData
