import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("../views/Login/LoginView.vue"),
    },
    {
      path: "/",
      component: () => import("../layout/Layout.vue"),
      redirect: "/index",
      children: [
        {
          name: "main",
          path: "main",
          redirect: "/index",
          component: () => import("../views/Chat/Chat.vue"),
          children: [
            {
              name: "index",
              path: "/index",
              component: () =>
                import("../views/Chat/components/Introduction.vue"),
            },
            {
              name: "chat",
              path: "/chat",
              component: () => import("../views/Chat/components/ChatList.vue"),
            },
          ],
        },
        {
          name: "library",
          path: "library",
          component: () => import("../views/Library/Library.vue"),
        },
      ],
    },
  ],
});

export default router
