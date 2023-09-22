// import React from 'react'
// import { Space, Typography } from "antd"
// import flattenSchema from "../../utils/flatten-schema"
// import Date from '../Date'
// import EventTypeTag from "../EventTypeTag"

type UseColumnsProps<T> = {
    onEdit?: (value: T, id: string) => void 
}

function useColumns<T>({ onEdit }: UseColumnsProps<T>) {

    // const flattenedSchema = flattenSchema(schema)

    // const columns = flattenedSchema.map(({name, label, component}) => {

    //     let render

    //     if(component === 'range_picker') {
    //         render = (value: string) => <Date value={value} />
    //     } else if(component === 'select') {
    //         render = (value: string) => <EventTypeTag value={value} />
    //     }

    //     return { title: label, key: name, dataIndex: name, render }}
    // )

    // return [...columns, {
    //     title: 'Action',
    //     render: (_1: string, record: T & {id: string}) => (
    //       <Space>
    //         <Typography.Link onClick={() => onEdit?.(record, record.id)}>Edit</Typography.Link>
    //       </Space>
    //     ),
    //   }]
}

export default useColumns
