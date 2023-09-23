import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { SaveConfig } from '../components/DataTable'

export default function useSaveModal<V>(save: SaveConfig<V>) {

	const [open, setOpen] = useState(false)
	const [form] = useForm<V>() 

	function showModal() {
		form.resetFields()
		setOpen(true)
	}

	function hideModal() {
		setOpen(false)
	}

	const summary = save.renderSummary(form.getFieldsValue())

	return {
		open,
		form,
		showModal,
		hideModal,
		summary
	}


}