import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MovieSearchView from '@/views/MovieSearchView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import AccountView from '@/views/AccountView.vue'
import LoginComponent from '@/components/LoginForm.vue'
import RegisterComponent from '@/components/RegisterForm.vue'
import ProfileComponent from '@/components/ProfileDetails.vue'

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
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
    children: [
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'register',
            component: RegisterComponent
        }
        ,
        {
            path: 'profile',
            component: ProfileComponent
        }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
