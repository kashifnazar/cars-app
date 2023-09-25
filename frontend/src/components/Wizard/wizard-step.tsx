import React from 'react'
import { Form } from 'antd'
import { Field } from '.'

type Props = {
    fields: Array<Field>
	hide?: boolean
}

function WizardStep({ fields, hide = false }: Props) {

	const display = hide ? 'none' : 'inline'

	return <div style={{display}}>
		<Form.Item name='id' hidden/>
		{
			fields.map(function renderField({control: {component: Component, props, name}, title}){
				return (<Form.Item name={name} label={title} key={title}>
					<Component {...props} />
				</Form.Item>)
			})
		}
	</div>
}

export default WizardStep