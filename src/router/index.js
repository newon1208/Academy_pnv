import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Dictionary from '../views/DictionaryView.vue';  // Đảm bảo tệp này tồn tại
import Calculator from '../views/CalculatorView.vue';
import Employees from '../views/EmployeesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/dictionary',
      name: 'DictionaryPage',
      component: Dictionary,  // Đảm bảo đường dẫn và tên tệp đúng
    },
    {
      path: '/calculator',
      name: 'Calculator',
      component: Calculator,
    },
    {
      path: '/employees',
      name: 'EmployeesView',
      component: Employees,
    },
  ],
});

export default router;
