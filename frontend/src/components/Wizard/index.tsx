import { Button } from 'antd'
import React, { ComponentType, forwardRef, useEffect, useImperativeHandle } from 'react'
import WizardStep from './wizard-step'
import useWizard from './useWizard'

type Control = {
    name: string,
    component: ComponentType;
    props: any
}

export type Field = {
    title: string
    control: Control
}

export type Step = {
    key?: string
    nextText?: string
    fields: Array<Field>
}

export type Props = {
    minHeight?: string
    steps: Step[]
    summary?: JSX.Element
    onSave: () => void
    onDone?: () => void
}

const Wizard = forwardRef<{resetWizard: () => void}, Props>(function Wizard({ steps, summary, onSave, onDone, minHeight }, ref){

	const { onOk, buttonText, current, reset } = useWizard({ steps, onSave, summary, onDone })

	useImperativeHandle(ref, () => ({
		resetWizard() {
			reset()
		}
	}))


	useEffect(() => {
		if(!summary) reset()
	}, [summary])

	return (
		<>
			<div style={{minHeight}}>
				{steps.map(function getStep({ key, ...step }, i){
					return <WizardStep key={key ?? 'step' + i} hide={current != i} {...step} />
				})}
				{summary}
			</div>
			<div className='content-right'>
				<Button type='primary' onClick={onOk}>{buttonText}</Button>
			</div>
		</>
	)
})

export default Wizard