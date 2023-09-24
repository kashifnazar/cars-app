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

			{colour?.id === 1 && <Text strong>THIS CAR IS RED! NICE!!</Text> }

			<Text>REF: {code}</Text>
		</div>
	)
}

export default CarSummary