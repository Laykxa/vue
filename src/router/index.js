import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
    {
        path: '/',
        name: "main",
        component: () => import("@/views/Main.vue"),
        redirect: "/home",
        children: [/*
            {
                path: 'home',
                name: "home",
                component: () => import("@/views/Home.vue"),
            },
            {
                path: 'user',
                name: "user",
                component: () => import("@/views/User.vue"),
            },
            {
                path: 'mall',
                name: "mall",
                component: () => import("@/views/Mall.vue"),
            },
            {
                path: 'aim',
                name: "aim",
                component: () => import("@/views/Aim.vue"),
            },
            {
                path: 'news',
                name: "news",
                component: () => import("@/views/News.vue"),
            },
            {
                path:'search',
                name:"search",
                component:()=>import("@/views/Search.vue"),
            }, */
       ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;