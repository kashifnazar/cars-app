import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { SaveConfig } from '../components/DataTable'

type ModalConfig = {
	title: string
}

export default function useSaveModal<V>(save: SaveConfig<V>) {

	const [form] = useForm<V>()
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState<JSX.Element>()

	function showModal({title}: ModalConfig) {
		setTitle(title)
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
		hideModal,
		modalTitle: title
	}


}