import BaseObject from "./base-object"
import Color from "./colour"
import Make from "./make"

export interface Car extends BaseObject {
    make: Make
    color: Color
    code: string
}