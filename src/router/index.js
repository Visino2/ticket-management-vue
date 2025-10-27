import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignupPage from '../pages/SignupPage.vue'
import Dashboard from '../pages/Dashboard.vue'
import TicketManager from '../pages/TicketManager.vue'

const routes = [
  { path: '/', name: 'Home', component: LandingPage },
  { path: '/auth/login', name: 'Login', component: LoginPage },
  { path: '/auth/signup', name: 'Signup', component: SignupPage },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets', name: 'Tickets', component: TicketManager, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Protect routes and redirect unauthorized to /auth/login
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem('ticketapp_session')
  if (to.meta.requiresAuth && !session) {
    // show descriptive reason via query (pages should show toast)
    next({ path: '/auth/login', query: { reason: 'expired' } })
  } else {
    next()
  }
})

export default router
