import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/Pages/HomePage.vue';
import ChildrenBenefit from './components/Pages/ChildrenBenefit.vue';
import HousingBenefit from './components/Pages/HousingBenefit.vue';
import HeatingBenefit from './components/Pages/HeatingBenefit.vue';
import VulnerableBenefits from './components/Pages/VulnerableBenefits.vue';
import OverallBenefits from './components/Pages/TestBenefit.vue';
import TestBenefit from './components/Pages/TestBenefit.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/OverallBenefits', component: OverallBenefits },
  { path: '/ChildrenBenefit', component: ChildrenBenefit },
  { path: '/HousingBenefit', component: HousingBenefit },
  { path: '/HeatingBenefit', component: HeatingBenefit },
  { path: '/VulnerableBenefits', component: VulnerableBenefits },
  { path: '/TestBenefit', component: TestBenefit },
];

const router = createRouter({
history: createWebHistory(process.env.NODE_ENV === 'production' ? '/Benefits-Gov-Platform/' : '/'),
  routes,
});

export default router;
