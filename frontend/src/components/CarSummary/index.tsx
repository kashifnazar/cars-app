import React from 'react'
import { Car } from '../../types/cars'

import { Tag, Typography } from 'antd'

const { Text } = Typography

type Props = {
	car: Partial<Car>
}

function CarSummary({car: {make, colour, code}}: Props) {
	return (
		<div>
			<Text>I have a <b>{make?.name}</b> and the colour is <Tag color={colour?.name ?? 'white'}>{colour?.name}</Tag>.</Text>

			{colour?.id == Number(process.env.REACT_APP_SPECIAL_COLOUR_ID) && <div style={{textTransform: 'uppercase'}}><br/><Text strong>THIS CAR IS {colour?.name}! NICE!!</Text></div> }

			{code && <><br /><Text>REF: <u>{code}</u></Text></>}
		</div>
	)
}

export default CarSummary