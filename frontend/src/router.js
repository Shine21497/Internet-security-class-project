import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Notfind from './views/404'
import Login from './views/Login'
import Home from './views/Home'
import MyClient from './views/MyClient'
import MyInfo from './views/MyInfo'
import MyOwnPlatform from './views/MyOwnPlatform'
import MyOwnClient from './views/MyOwnClient'
import MyPlatform from './views/MyPlatform'
import MyMap from './views/MyMap'
import MyQueried from './views/MyQueried'
import Query from './views/Query'
import MyMerchant from './views/MyMerchant'
import ElementUI from 'element-ui';
import Demo from "./views/Demo";
import MapQuery from "./views/MapQuery";
import BlockChainShow from "./views/BlockChainShow";

Vue.use(ElementUI);
Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/demo', name: 'demo', component:Demo },
        {path: '*', name: '/404', component: Notfind},
        {path: '/', redirect: '/login'},
        {path: '/login', name: 'login', component: Login},
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                {path: '', component: Home},
                {path: '/home', name: 'home', component: Home},
                {path: '/my-client', name: 'MyClient', component: MyClient},
                {path: '/my-info', name: 'MyInfo', component: MyInfo},
                {path: '/my-own-platform', name: 'MyOwnPlatform', component: MyOwnPlatform},
                {path: '/my-platform', name: 'MyPlatform', component: MyPlatform},
                {path: '/my-map', name: 'MyMap', component: MyMap},
                {path: '/my-queried', name: 'MyQueried', component: MyQueried},
                {path: '/map-query', name: 'MapQuery', component: MapQuery},
                {path: '/block-chain', name: 'BlockChainShow', component: BlockChainShow},
                {path: '/query', name: "Query", component: Query},
                {path: '/my-merchant', name: "MyMerchant", component: MyMerchant},
                {path: '/my-own-platform/client', name: "MyOwnClient", component: MyOwnClient},
            ]
        },
    ]
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (localStorage.getItem('im') * 1 === 1) {
        localStorage.setItem('im', '0')
    } else {
        localStorage.setItem('needLogin', "0");
    }
    if (to.path == "/login" || to.path == "/register" || to.path == "/demo") {
        next();
    } else {
        if (isLogin) {
            next();
        } else {
            localStorage.setItem('needLogin', "1");
            localStorage.setItem('im', "1");
            // console.log("reset");
            // console.log(localStorage.needLogin);
            // console.log(localStorage.getItem('needLogin'));
            // Vue.$message('请先登录');
            next("/login");
        }
    }
});

export default router;
