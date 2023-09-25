import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { SaveConfig } from '../components/DataTable'

type ModalConfig = {
	title: string
}

export default function useSaveModal<V>(save: SaveConfig<V>) {

	const [form] = useForm<V>()
	const [title, setTitle] = useState('')
	const [open, setOpen] = useState(false)
	const [summary, setSummary] = useState<JSX.Element>()

	function showModal({ title }: ModalConfig) {
		setTitle(title)
		setSummary(undefined)
		form.resetFields()
		setOpen(true)
	}

	function hideModal() {
		setOpen(false)
		form.resetFields()
	}

	async function onDone() {
		const values = await form.validateFields()
		const summary = save.renderSummary(values)
		setSummary(summary)
	}

	return {
		open,
		form,
		summary,
		onDone,
		showModal,
		hideModal,
		setSummary,
		modalTitle: title
	}


}