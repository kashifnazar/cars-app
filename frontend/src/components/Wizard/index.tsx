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
    steps: Step[]
    summary: JSX.Element
    onSave: () => void
}

function Wizard({ steps, summary, onSave }: Props){

	const { onOk, buttonText, current, isSummary } = useWizard({ steps, onSave, summary })

	return (
		<>
			{steps.map(function getStep({key, ...step}, i){
				return <WizardStep key={key ?? 'step' + i} hide={current != i} {...step} />
			})}
			{isSummary && summary}
			<Button onClick={onOk}>{buttonText}</Button>
		</>
	)
}

export default Wizard