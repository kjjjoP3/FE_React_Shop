import DashboardPage from '~/pages/DashboardPage';
import JSKKK from '~/pages/JSKKK';

//public routes
const publicRoutes = [
    { path: '/', component: DashboardPage },
    { path: '/following', component: JSKKK },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
