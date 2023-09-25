import React from 'react'
import { Car } from '../../types/cars'

import { Typography } from 'antd'

const { Text } = Typography

type Props = {
	car: Partial<Car>
}

function CarSummary({car: {make, colour, code}}: Props) {
	return (
		<div>
			<Text>I have a {make?.name} and the colour is {colour?.name}</Text>

			{colour?.id == Number(process.env.REACT_APP_SPECIAL_COLOUR_ID) && <div style={{textTransform: 'uppercase'}}><br/><Text strong>THIS CAR IS {colour?.name}! NICE!!</Text></div> }

			<br /><Text>REF: {code}</Text>
		</div>
	)
}

export default CarSummary