import { api } from './api'
import type { Discount } from '../features/discount/types/discount'

export interface CreateDiscountPayload {
    name: string
    type: 'percentage' | 'nominal'
    value: number
}

export const discountService = {
    async getAll() {
        const { data } = await api.get<Discount[]>(
            '/discount',
        )
        return data
    },

    async create(
        payload: CreateDiscountPayload,
    ) {
        const { data } = await api.post(
            '/discount',
            payload,
        )
        return data
    },

    async delete(id: string) {
        return api.delete(`/discount/${id}`)
    },
}