import BaseObject from './base-object'

export interface CarFormValue extends BaseObject {
    makeId: number
    colourId: number
    code: string
}