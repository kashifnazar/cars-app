import axios from "axios"
import DataTable, { SaveConfig, SearchConfig } from "../components/DataTable"
import { useMutation, useQuery } from "react-query"
import { useEffect, useMemo, useState } from "react"
import { TableColumnsType } from "antd"

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL

type WithDataProps<T> = {
    endpoint: string
    entityName: string
    columns: TableColumnsType<T>
}

function withData<T extends Record<PropertyKey, any>>({ endpoint, entityName, columns}: WithDataProps<T>){

    function Component() {

        const [keyword, setKeyword] = useState('')

        const { data, isLoading, refetch, error } = useQuery<Array<T>>({
            queryKey: endpoint,
            queryFn: async () => {

                //if a keyword is given, add it to the query
                const url =  endpoint + (keyword ? `?keyword=${keyword}` : '')

                const { data } = await axios.get(url)
                return data
              }
        })

        const { mutate } = useMutation<T, unknown, T>({
            mutationFn: async (variables: T & { id?: string} ) => {
                
                //If the entity contains an id, send a PUT request to :/id with the endpoint. Otherwise send a POST request to the endpoint
                const url = variables.id ? [endpoint, variables.id].join('/') : endpoint

                let response 

                if(variables.id) 
                    response = await axios.put(url, variables)
                else 
                    response = await axios.post(url, variables)

                const {data} = response

                return data
            },
            onSuccess(data, variables, context) {
                refetch()
            },
        })

        // Refetch whenever a new keyword is searched for
        useEffect(() => {
            refetch()
        }, [keyword, refetch])

        // Construct save config to be passed to the DataTable
        const saveConfig = useMemo<SaveConfig<T>>(() => {
            return {
                createLabel: 'New ' + entityName,
                async onSave(value: T, id: string | null) {
                    mutate({...value, id: id ?? undefined})
                }
            }
        }, [mutate])

        // Construct search config to be passed to the DataTable
        const searchConfig = useMemo<SearchConfig>(() => {
            return {
                onSearch(value) {
                    setKeyword(value)
                }
            }
        }, [])

        if(error) return <div>There was an error</div>

        return <DataTable<T> title={entityName} dataSource={data || []} columns={columns} save={saveConfig} search={searchConfig} isLoading={isLoading}/>
    }

    return Component
}

export default withData
