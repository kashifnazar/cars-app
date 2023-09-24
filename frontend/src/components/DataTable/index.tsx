/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import Modal from 'antd/es/modal/Modal'
import Wizard, { Step } from '../Wizard'
import Title from 'antd/es/typography/Title'
import { Content } from 'antd/es/layout/layout'
import useSaveModal from '../../hooks/useSaveModal'
import { Button, Table, message, Form, TableColumnsType } from 'antd'

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
}

function DataTable<T extends Record<PropertyKey, any>, V>({ title, columns, dataSource, save, isLoading }: Props<T, V>) {

	const [messageApi, contextHolder] = message.useMessage()

	const { form, open, summary, showModal, hideModal, onSave, onDone, modalTitle } = useSaveModal<V>(save)

	const newTitle = save?.createLabel || 'New'
    
	return (
		<>
			{contextHolder}
			<Title>{title}</Title>

			<div className='action-bar'>{save && 
					<Button type='primary' onClick={() => showModal({title: newTitle})}>{newTitle}</Button>
			}</div>

			
			<Content>
				<Table<T> className="table-striped-rows" dataSource={dataSource} columns={columns as TableColumnsType<T>} pagination={false} loading={isLoading} />
			</Content>
			
			{save && <Modal
				title={modalTitle}
				open={open}
				footer={null}
				onCancel={hideModal}
				bodyStyle={{marginTop: '2rem'}}
			>
				<Form form={form}>
					<Wizard steps={save?.steps || []} onSave={onSave} onDone={onDone} summary={summary} minHeight={save.minHeight} />
				</Form>
			</Modal> }
		</>
	)
}

export default DataTable