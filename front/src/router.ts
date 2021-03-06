import Vue from 'vue';
import Router from 'vue-router';
import Game from './components/Game/Game.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'game',
            component: Game,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
            path: '/settings',
            name: 'settings',
            component: () =>
                import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
        },
        {
            path: '/scores',
            name: 'scoreboard',
            component: () =>
                import(/* webpackChunkName: "scoreboard" */ './views/Scoreboard.vue'),
        },
    ],
});
