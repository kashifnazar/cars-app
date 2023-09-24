import { useEffect, useState } from 'react'
import { Props } from '.'

type UseWizardProps = Props

function useWizard({ steps, onSave }: UseWizardProps) {

	const [current, setCurrent] = useState(0)
	const [buttonText, setButtonText] = useState('Next')
	const [isSummary, setIsSummary] = useState(false)

	async function onOk() {
		if(current === steps.length) {
			onSave()
			setCurrent(0)
		} else {
			onNext()
		}
	}

	function onNext() {
		setCurrent(current => ++current)
	}

	useEffect(() => {
		setIsSummary(current === steps.length)
		setButtonText(current === steps.length ? 'Submit' : current === steps.length - 1 ? 'Done' : 'Next')
	}, [current])
    

	return {
		onOk,
		current,
		isSummary,
		buttonText,
	}
}

export default useWizard