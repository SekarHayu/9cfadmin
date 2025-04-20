import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/scan',
            component: () => import('../views/Scan.vue')
        },
        {
            path: '/ticket',
            component: () => import('../views/Ticket.vue')
        },
        {
            path: '/settings',
            component: () => import('../views/Settings.vue')
        },
        {
            path: '/voucher',
            component: () => import('../views/voucher.vue')
        },
        {
            path: '/form',
            component: () => import('../views/Form.vue')
        },
        {
            path: '/dokumen',
            component: () => import('../views/Dokumen.vue')
        },
    ]
})

export default router
