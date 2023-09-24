import React from 'react'
import { Input, Select } from 'antd'
import withData from '../hoc/withData'
import { Car } from '../types/cars'
import CarSummary from '../components/CarSummary'
import useGet from '../hooks/useGet'
import Make from '../types/make'
import Colour from '../types/colour'
import BaseObject from '../types/base-object'

function Cars() {

	const { data: makes } = useGet<Make>({endpoint: 'makes'})
	const { data: colours } = useGet<Colour>({endpoint: 'colours'})

	const getOptions = (entities?: Array<BaseObject>) => entities?.map(({id, name}) => ({label: name, value: id})) ?? []

	const Component = withData<Car, Car>({
		endpoint: 'cars',
		entityName: 'Car',
		renderSummary: ({ colour, code, make}: Car) => <CarSummary car={{ colour, code, make}}/>,
		columns: [{
			key: 'name',
			title: 'Name',
			dataIndex: 'name',
		},
		{
			key: 'make',
			title: 'Make',
			dataIndex: 'make',
			render: function(_1, { make }) {
				return make.name
			}
		},
		{
			key: 'colour',
			title: 'Colour',
			dataIndex: 'colour',
			render: function(_1, { colour }) {
				return colour.name
			}
		},
		{
			key: 'code',
			title: 'Code',
			dataIndex: 'code',
		}],
		steps: [
			{
				fields: [
					{
						title: 'Name',
						control: {
							name: 'name',
							component: Input,
							props: {
								
							}
						}
					},
					{
						title: 'Make',
						control: {
							name: 'makeId',
							component: Select,
							props: {
								options: getOptions(makes)
							}
						}
					}]
			},
			{
				fields: [
					{
						title: 'Colour',
						control: {
							name: 'colourId',
							component: Select,
							props: {
								options: getOptions(colours)
							}
						}
					}]
			},
			{
				fields: [
					{
						title: 'Code',
						control: {
							name: 'code',
							component: Input,
							props: {
							
							}
						}
					}]
			},
	
		]
	})

	return <Component />
}

export default Cars