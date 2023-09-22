import React from 'react'
import { render, screen, waitFor } from "@testing-library/react"
import DataTable from "."
import userEvent from '@testing-library/user-event'



// /**
//  * A utility function
//  * 
//  * @param fillTitle
//  */
// const inputAndSubmitForm = (fillTitle = true) => {
//     render(<DataTable schema={titleSchema} dataSource={[]} save={{createLabel: 'Create Event', onSave: async () => {}}} />)
//     expect(screen.getAllByRole('row')).toHaveLength(2)
    
//     userEvent.click(screen.getByText('Create Event'))
//     //Fill in the title
//     fillTitle && userEvent.type(screen.getByRole('textbox'), 'Hello')
 
//     userEvent.click(screen.getByText('Save'))
// }

// test('No data is rendered for empty dataSource', async () => {
//    render(<DataTable schema={titleSchema} dataSource={[]} />)
//    expect(screen.getByText('No data')).toBeTruthy()
// })

// test('A data row shows with title and date columns', async () => {
//    render(<DataTable schema={titleAndRangeSchema} dataSource={dataSource} />)
   
//    expect(screen.getAllByRole('row')).toHaveLength(2)
//    expect(screen.queryByText('No Data')).toBeNull()
//    expect(screen.getByText('Hello World')).toBeInTheDocument()
//    expect(screen.getByText('20/09/2023')).toBeInTheDocument()
// })

// test('Saving the form with valid inputs results in the success toast', async () => {
//   inputAndSubmitForm()

//   await waitFor(() => {
//     expect(screen.getByText('The record has saved successfully')).toBeInTheDocument()
//   })
// })


// test('Saving the form without a required field results an error', async () => {
//     inputAndSubmitForm(false)

//     await waitFor(() => {
//         expect(screen.getByText('Required')).toBeInTheDocument()
//     })
// })