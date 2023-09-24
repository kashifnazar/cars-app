import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { SaveConfig } from '../components/DataTable'

export default function useSaveModal<V>(save: SaveConfig<V>) {

	const [form] = useForm<V>()
	const [open, setOpen] = useState(false)
	const [summary, setSummary] = useState<JSX.Element>()

	function showModal() {
		form.resetFields()
		setOpen(true)
	}

	function hideModal() {
		setOpen(false)
	}

	async function onDone() {
		const values = await form.validateFields()
		const summary = save.renderSummary(values)
		setSummary(summary)
	}

	async function onSave() {
		const values = await form.validateFields()
		await save.onSave(values)
		hideModal()
	}

	return {
		open,
		form,
		summary,
		onSave,
		onDone,
		showModal,
		hideModal
	}


}