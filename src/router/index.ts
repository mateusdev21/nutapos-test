import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'discount',
        component: () =>
            import('../features/discount/pages/DiscountListPage.vue'),
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})