import React from 'react'
import { Car } from '../../types/cars'

type Props = {
	car: Partial<Car>
}

function CarSummary({car: {make, colour, code}}: Props) {
	return (
		<div>
			{/* <>I have a {make} and the colour is {colour}</>

			{colour.id === 'red' && <br/>THIS CAR IS RED! NICE!! }

			<br/>REF: {code} */}

		</div>
	)
}

export default CarSummary