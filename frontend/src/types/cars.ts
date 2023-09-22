import BaseObject from "./base-object"
import Colour from "./colour"
import Make from "./make"

export interface Car extends BaseObject {
    make: Make
    colour: Colour
    code: string
}