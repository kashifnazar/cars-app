import { Button } from 'antd'
import React, { ComponentType } from 'react'
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

function Wizard({ steps, summary, onSave, onDone, minHeight }: Props){

	const { onOk, buttonText, current } = useWizard({ steps, onSave, summary, onDone })

	return (
		<>
			<div style={{minHeight}}>
				{steps.map(function getStep({key, ...step}, i){
					return <WizardStep key={key ?? 'step' + i} hide={current != i} {...step} />
				})}
				{summary}
			</div>
			<Button onClick={onOk}>{buttonText}</Button>
		</>
	)
}

export default Wizard