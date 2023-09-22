/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { Button, Col, Layout, Row, Table, Input, message, Form, Alert, TableColumnsType } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { ColumnsType } from 'antd/es/table'
import useModal from '../../hooks/useModal'
// import useColumns from './useColumns'
import useEntityForm from './useEntityForm'
import Modal from 'antd/es/modal/Modal'
import Title from 'antd/es/typography/Title'

const { Search } = Input

const headerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	height: 64,
	paddingInline: 50,
	lineHeight: '64px',
	backgroundColor: '#eee',
}

const buttonStyle: React.CSSProperties = {
	borderRadius: 0
}

export type SearchConfig = {
    placeholder?: string
    onSearch: (value: string) => void
}

export type SaveConfig<T> = {
    createLabel?: string,
    onSave: (value: T, id: string | null) => Promise<void>
}

type Props<T extends Record<PropertyKey, any>> = {
    columns: TableColumnsType<T>
    dataSource: Array<T>
    save?: SaveConfig<T>
    title?: string
    isLoading?: boolean
}

function DataTable<T extends Record<PropertyKey, any>>({ title, columns, dataSource, save, isLoading}: Props<T>) {

	const [messageApi, contextHolder] = message.useMessage()


	// const {submit, reset, form, fields, error, populate} = useEntityForm({
	//     columns,
	//     name: 'Form',
	//     onSubmit: save?.onSave,
	// })
    
	const { showModal,
		open,
		okText,
		okHandler,
		confirmLoading,
		cancelHandler,
		bodyStyle 
	} = useModal({
		title: save?.createLabel || 'Create',
		okText: 'Save',
		onOk: async () => {
			// await submit()
			messageApi.open({
				type: 'success',
				content: 'The record has saved successfully',
			})
		},
		// onCancel: reset
	})

	const showFormModal = (data?: T, id?: string) => {
		showModal()
		// reset()
        
		// if(data) {
		//     populate(data, id)
		// }
	}

	// const columns = useColumns({schema, onEdit: showFormModal})
    
	return (
		<>
			{contextHolder}
			<Title>{title}</Title>
			<Layout>
				<Header style={headerStyle}>
					<Row justify='space-between' >
						<div></div>
						{save && <Col span={4}>
							<Button type='primary' style={buttonStyle} onClick={() => showFormModal()}>{save?.createLabel || 'Create'}</Button>
						</Col>}
					</Row>
				</Header>
				<Content>
					<Table<T> dataSource={dataSource} columns={columns as TableColumnsType<T>} pagination={false} loading={isLoading} />
				</Content>
			</Layout>
			<Modal
				title={title}
				open={open}
				okText={okText}
				onOk={okHandler}
				confirmLoading={confirmLoading}
				onCancel={cancelHandler}
				bodyStyle={bodyStyle}>
				{/* <Form<T> 
					form={form}
					validateTrigger='onSubmit' 
					layout='vertical'>
					{fields}
				</Form>
				{error && <Alert type='error' message='There are errors in the form. Please correct before saving.'/>} */}
			</Modal> 
		</>
	)
}

export default DataTable