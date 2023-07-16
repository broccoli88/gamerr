import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            children: [
                {
                    path: '',
                    name: 'all-games',
                    component: () => import('../views/home/HomeGamesPreviewView.vue')
                }
            ]
        }
    ]
})

export default router
