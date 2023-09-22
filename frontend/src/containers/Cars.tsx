import withData from '../hoc/withData'
import { Car } from '../types/cars'

export default withData<Car>({
    endpoint: 'cars',
    entityName: 'Car',
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
    },]
})