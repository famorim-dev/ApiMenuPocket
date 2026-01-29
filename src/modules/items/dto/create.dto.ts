export class CreateDto{
    id_restaurants: string
    name_restaurants: string
    name: string 
    value: string
    description?: string
    category: string
    promotion: boolean
    value_promotion?: string
    highlight?: boolean
}