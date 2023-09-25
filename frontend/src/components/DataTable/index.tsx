/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import Modal from 'antd/es/modal/Modal'
import Wizard, { Step } from '../Wizard'
import Title from 'antd/es/typography/Title'
import { Content } from 'antd/es/layout/layout'
import useSaveModal from '../../hooks/useSaveModal'
import { DeleteOutlined, EditFilled } from '@ant-design/icons'
import { Button, Table, message, Form, TableColumnsType, Space, Popconfirm } from 'antd'

export type SearchConfig = {
    placeholder?: string
    onSearch: (value: string) => void
}

export type SaveConfig<V> = {
    createLabel?: string
	minHeight?: string
    steps: Array<Step>
    renderSummary: (values: V) => JSX.Element
    onSave: (value: V) => Promise<void>
}

type Props<T extends Record<PropertyKey, any>, V> = {
    columns: TableColumnsType<T>
    dataSource: Array<T>
    save: SaveConfig<V>
    title?: string
    isLoading?: boolean
	onDelete?: (id: number) => Promise<void>
	initialValues?: Partial<V>
}

function DataTable<T extends Record<PropertyKey, any>, V>({ title, columns, dataSource, save, isLoading, onDelete, initialValues }: Props<T, V>) {

	const [messageApi, contextHolder] = message.useMessage()

	const { form, open, summary, showModal, hideModal, onSave, onDone, modalTitle } = useSaveModal<V>(save)

	const newTitle = save?.createLabel || 'New'

	async function onConfirmDelete(id: number) {
		await onDelete?.(id)
		messageApi.success('The record has deleted successfully')
	}

	function showEditModal(values: V) {
		showModal({
			title: 'Edit'
		})
		form.setFieldsValue(values as any)
	}
    
	const columnsWithActions: TableColumnsType<T> = [...columns, {
		align: 'right',
		dataIndex: 'id',
		key: 'id',
		render(id: number, values: T) {
			return <Space>
				<Popconfirm
					title='Delete'
					description = 'Are you sure and you want to delete this record?'
					onConfirm={() => onConfirmDelete?.(id)}
					okType='danger'
					okText="Yes"
					cancelText="No">
					<Button danger size='small' shape='round' icon={<DeleteOutlined />} />
				</Popconfirm>
				<Button 
					type='primary' 
					size='small' 
					shape='round' 
					icon={<EditFilled />}
					onClick={() => showEditModal(values)}	
				/>
				
			</Space>
		}
	}]

	return (
		<>
			{contextHolder}
			<Title>{title}</Title>

			<div className='action-bar'>{
				save && 
				<Button type='primary' size='large' onClick={() => showModal({title: newTitle})}>{newTitle}</Button>
			}</div>

			
			<Content>
				<Table<T> className="table-striped-rows" dataSource={dataSource} columns={columnsWithActions as TableColumnsType<T>} pagination={false} loading={isLoading} />
			</Content>
			
			{save && <Modal
				title={modalTitle}
				open={open}
				footer={null}
				onCancel={hideModal}
				bodyStyle={{marginTop: '2rem'}}>
				<Form form={form} initialValues={initialValues}>
					<Wizard steps={save?.steps || []} onSave={onSave} onDone={onDone} summary={summary} minHeight={save.minHeight} />
				</Form>
			</Modal>}
		</>
	)
}

export default DataTable