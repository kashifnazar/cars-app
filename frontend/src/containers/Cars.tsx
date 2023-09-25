import React, { useMemo } from 'react'
import { Input, Select, Tag } from 'antd'
import withData from '../hoc/withData'
import { Car } from '../types/cars'
import CarSummary from '../components/CarSummary'
import useGet from '../hooks/useGet'
import Make from '../types/make'
import Colour from '../types/colour'
import BaseObject from '../types/base-object'
import { CarFormValue as CarFormValue } from '../types/car-form-value'

function Cars() {

	const { data: makes } = useGet<Make>({endpoint: 'makes'})
	const { data: colours } = useGet<Colour>({endpoint: 'colours'})

	const getOptions = (entities?: Array<BaseObject>) => entities?.map(({id, name}) => ({label: name, value: id})) ?? []

	const Component = useMemo(() => {
		return withData<Car, CarFormValue>({
			title: 'Cars',
			endpoint: 'cars',
			dialogHeight: '150px',
			entityName: 'Car',
			initialValues: {
				colourId: 1,
				makeId: 1
			},
			renderSummary: ({ colourId, code, makeId}: CarFormValue) => {
				const colour = colours?.find(c => c.id === colourId)
				const make = makes?.find(m => m.id === makeId)
				return <CarSummary car={{ colour, code, make}}/>
			},
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
					return <Tag style={{minWidth: '3rem', textAlign: 'center'}} color={colour.name}>
						{colour.name}
					</Tag>
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
	}, [makes?.length, colours?.length])

	return <Component />
}

export default Cars