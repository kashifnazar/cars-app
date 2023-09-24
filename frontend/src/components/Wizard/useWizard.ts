import { useEffect, useState } from 'react'
import { Props } from '.'

type UseWizardProps = Props

function useWizard({ steps, onSave, onDone }: UseWizardProps) {

	const [current, setCurrent] = useState(0)
	const [buttonText, setButtonText] = useState('Next')

	async function onOk() {
		if(current === steps.length) {
			onSave()
			setCurrent(0)
		} if (current === steps.length -1) {
			onDone?.()
			moveNext()
		} else {
			moveNext()
		}
	}

	function moveNext() {
		setCurrent(current => ++current)
	}

	useEffect(() => {
		setButtonText(current === steps.length ? 'Submit' : current === steps.length - 1 ? 'Done' : 'Next')
	}, [current])
    

	return {
		onOk,
		current,
		buttonText,
	}
}

export default useWizard