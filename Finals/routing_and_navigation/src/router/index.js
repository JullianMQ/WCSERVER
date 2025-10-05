import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/pages/HomeView.vue'
import BlogView from '@/pages/BlogView.vue'
import AboutView from '@/pages/AboutView.vue'
import ContactView from '@/pages/ContactView.vue'
import GalleryView from '@/pages/GalleryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/blog', component: BlogView },
    { path: '/about', component: AboutView },
    { path: '/contact', component: ContactView },
    { path: '/gallery', component: GalleryView },
  ],
})

export default router
