import React, {useState} from 'react';
// import { Field, Schema } from '../../common/types/schema'
import { Form, Input, Select, DatePicker } from 'antd'
// import { SingleOrMultiple } from '../../common/types/single-or-multiple'
import dayjs from 'dayjs'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
const { useForm } = Form

type Props<T> = {
    name: string
    onSubmit?: (value: T, id: string | null) => Promise<void>
}

// const formItemStyle: React.CSSProperties = {
//     marginTop: '1rem'
// }

// For the case of name as array in the schema (name: ['startDate', 'endDate']) create a single key, seperated by __
// const getFieldName = (name: SingleOrMultiple<string>): string => Array.isArray(name) ? name.join('__') : name

/**
 * Returns an appropriate component on the basis 'component' attribute from the schema.
 * 
 * @param field 
 * @returns 
 */
// function getComponent(field: Field) {

//     switch(field.component) {
//         case 'text':
//             return <Input />
        
//         case 'select':
//             return <Select>
//                 {field.options.map(o => <Option key={o.value} value={o.value}>{o.label}</Option>)}
//             </Select>

//         case 'range_picker':
//             return <RangePicker></RangePicker>

//         case 'textarea':
//             return <TextArea></TextArea>
//     }
// }

//if values is available,  create multiple keys for values such as [startDate, endDate]
// function getFormValues<T>(values: T | undefined, schema: Schema) {
//         return schema.reduce((acc, { name }) => {
//             return {
//                 ...acc,
//                 //@ts-ignore
//                 [getFieldName(name)]: Array.isArray(name) ? name.map(n => dayjs(values[n])) : values[name]
//             }
//         }, {})
// }

// /** Spreads the array of values against the given schema.
//  * i.e., for [startDate, endDate] it converts 'startDate__endDate' array and makes to different values out of it.
// */
// function getSchemaValues<T>(formValues: T, schema: Schema) {
//     return schema.reduce((acc, { name, component }) => {
//         return {
//             ...acc,
//             //@ts-ignore
//             ...Array.isArray(name) ? name.reduce((a, n, i) => ({...a, [n]: formValues[getFieldName(name)]?.[i]?.format('YYYY-MM-DD')}), {}): {[name]: formValues[name]}
//         }
//     }, {})
// }

/**
 *  A general purpose form creator that creates the form on the basis of the schema
 * 
 * @param param
 * @returns 
 */
function useEntityForm<T>({name, onSubmit}: Props<T>) {

    const [id, setId] = useState<string | null>(null)
    const [form] = useForm<T>()

    const [error, setError] = useState(false)

    // Calls the on submit function. If that is successful, it resets the fields
    const submit = async () => {

        // setError(true)
        
        // const values = await form.validateFields()
    
        // //Convert form value to submittable data structure
        // const schemaValues = getSchemaValues(values, schema) as T        

        // await onSubmit?.(schemaValues, id)
        // form.resetFields()
    }

    // Resets the form
    const reset = () => {
        form.resetFields()
        setId(null)
        setError(false)
    }

    /**
     * Populate the form with values and set the id
     * @param values - To populate the form
     * @param id 
     * @returns 
     */
    const populate = (values?: T, id?: string) => {

        reset()
        
        setId(id ?? null)
        
        let finalValues = values

        if(values) {
            //@ts-ignore
            finalValues = getFormValues<T>(values, schema)
        }

        // @ts-ignore //TODO: Figure this out
        form.setFieldsValue(finalValues)
    }

    // Create list of fields wrapped with Form.Item
    const fields = [''] //schema.map(s => {

        // const name = getFieldName(s.name)

        //  return <Form.Item 
        //         key={name}
        //         style={formItemStyle} 
        //         label={s.label} 
        //         name={name} 
        //         rules={[...s.required ? [{ required: true, message: 'Required' }] : []]}>
        //     {getComponent(s)}
        // </Form.Item>
    // })


    return {
        error,
        submit,
        reset,
        fields,
        form,
        populate
    }
    
}

export default useEntityForm
