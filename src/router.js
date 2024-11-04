import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/Pages/HomePage.vue';
import ChildrenBenefit from './components/Pages/ChildrenBenefit.vue';
import HousingBenefit from './components/Pages/HousingBenefit.vue';
import HeatingBenefit from './components/Pages/HeatingBenefit.vue';
import DisabilityBenefit from './components/Pages/DisabilityBenefit.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/SummaryBenefit', component: ChildrenBenefit },
  { path: '/ChildrenBenefit', component: ChildrenBenefit },
  { path: '/HousingBenefit', component: HousingBenefit },
  { path: '/DisabilityBenefit', component: DisabilityBenefit },
  { path: '/HeatingBenefit', component: HeatingBenefit },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
