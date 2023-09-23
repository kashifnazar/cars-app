import React from 'react'
import { Input, Select } from 'antd'
import withData from '../hoc/withData'
import { Car } from '../types/cars'
import CarSummary from '../components/CarSummary'

export default withData<Car, Car>({
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
						name: 'make',
						component: Select,
						props: {
							options: [{
								label: 'Audi',
								value: 'AUD'
							}]
						}
					}
				}]
		},
		{
			fields: [
				{
					title: 'Colour',
					control: {
						name: 'colour',
						component: Select,
						props: {
							options: [{
								label: 'Red',
								value: 'Red'
							}]
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