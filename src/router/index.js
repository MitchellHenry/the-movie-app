import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieSearchView from '../views/MovieSearchView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: MovieSearchView
  },
  {
    path: '/movie/:id',
    name: 'movie detail',
    component: MovieDetailView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
