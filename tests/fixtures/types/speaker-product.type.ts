import { Product } from "./product.type"

export type SpeakerProduct = Product &{
    compatibility: string
    connector: string
    manufacturer: string
    weight: string
    wirelessTechnology: string
}