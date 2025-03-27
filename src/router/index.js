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
            path: '/edit',
            component: () => import('../views/Edit.vue')
        },{
            path: '/settings',
            component: () => import('../views/Settings.vue')
        },
    ]
})

export default router