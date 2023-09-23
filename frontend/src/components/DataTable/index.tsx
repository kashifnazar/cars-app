/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { Button, Col, Layout, Row, Table, Input, message, Form, Alert, TableColumnsType, InputNumber, Select } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Modal from 'antd/es/modal/Modal'
import Title from 'antd/es/typography/Title'
import Wizard, { Step } from '../Wizard'
import useSaveModal from '../../hooks/useSaveModal'

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

export type SaveConfig<V> = {
    createLabel?: string,
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

	const {form, open, showModal, hideModal} = useSaveModal<V>(save)

	async function onSave() {
		const values = await form.validateFields()
		await save.onSave(values)
		hideModal()
	}
    
	return (
		<>
			{contextHolder}
			<Title>{title}</Title>
			<Layout>
				<Header style={headerStyle}>
					<Row justify='space-between' >
						<div></div>
						{save && <Col span={4}>
							<Button type='primary' style={buttonStyle} onClick={() => showModal()}>{save?.createLabel || 'Create'}</Button>
						</Col>}
					</Row>
				</Header>
				<Content>
					<Table<T> dataSource={dataSource} columns={columns as TableColumnsType<T>} pagination={false} loading={isLoading} />
				</Content>
			</Layout>
			{save && <Modal
				title={title}
				open={open}
				footer={null}
				onCancel={hideModal}
			>
				<Form form={form}>
					<Wizard steps={save?.steps || []} onSave={onSave} summary={<div></div>} />
				</Form>
			</Modal> }
		</>
	)
}

export default DataTable