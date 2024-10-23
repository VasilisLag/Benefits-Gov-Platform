import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import ChildrenBenefit from './components/ChildrenBenefit.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/SummaryBenefit', component: ChildrenBenefit },
  { path: '/ChildrenBenefit', component: ChildrenBenefit },
  { path: '/HeatingBenefit', component: ChildrenBenefit },
  { path: '/DisabilityBenefit', component: ChildrenBenefit },
  { path: '/HousingBenefit', component: ChildrenBenefit },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
