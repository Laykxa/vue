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
                path: 'messages',
                name: "messages",
                component: () => import("@/views/Messages.vue"),
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
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;