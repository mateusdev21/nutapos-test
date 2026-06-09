export interface Discount {
    _id: string
    name: string
    type: 'percentage' | 'nominal'
    value: number
}