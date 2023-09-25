import { useEffect, useState } from 'react'
import { Props } from '.'

type UseWizardProps = Props

function useWizard({ steps, onSave, onDone }: UseWizardProps) {

	const [current, setCurrent] = useState(0)
	const [buttonText, setButtonText] = useState('Next')

	function reset() {
		setCurrent(0)
	}

	async function onOk() {
		if(current === steps.length) {
			onSave()
			reset()
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
		reset,
		current,
		buttonText,
	}
}

export default useWizard