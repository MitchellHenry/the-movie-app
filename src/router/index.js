import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MovieSearchView from '@/views/MovieSearchView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import AccountView from '@/views/AccountView.vue'
import LoginComponent from '@/components/LoginForm.vue'
import RegisterComponent from '@/components/RegisterForm.vue'
import ProfileComponent from '@/components/ProfileDetails.vue'
import PollsView from '@/views/PollsView.vue'
import ManagePollsView from '@/views/ManagePollsView.vue'
import CreatePoll from '@/components/CreatePoll.vue'
import EditPoll from '@/components/EditPoll.vue'
import DeletePoll from '@/components/DeletePoll.vue'

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
    path: '/vote',
    name: 'movie voting',
    component: PollsView
  },
  {
    path: '/account',
    name: 'account',
    redirect: () => {
      return { path: '/account/login' };
    },
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
  },
  {
    path: '/managepolls',
    name: 'managepolls',
    redirect: () => {
      return { path: '/managepolls/create' };
    },
    component: ManagePollsView,
    children: [
        {
            path: 'create',
            component: CreatePoll
        },
        {
            path: 'edit',
            component: EditPoll
        }
        ,
        {
            path: 'delete',
            component: DeletePoll
        }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
