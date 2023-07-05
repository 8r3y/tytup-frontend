import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/public/HomeView.vue'
import { routesList } from './routes-list'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/public/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/public/LoginView.vue')
    },
    {
      path: routesList.recomendations.path,
      name: routesList.recomendations.name,
      component: () => import('../views/public/main-stack/RecomendationsView.vue')
    },
    {
      path: routesList.seeVideo.path,
      name: routesList.seeVideo.name,
      component: () => import('../views/public/main-stack/SeeVideoView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/public/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // ...
  // explicitly return false to cancel the navigation
  console.log('router.beforeEach', { to, from, next })
  next()
})

export default router
