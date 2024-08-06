import { createRouter, createWebHashHistory } from 'vue-router'
import Chat from "../views/QA/Chat.vue";

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
          name: "index",
          path: "index",
          redirect:"/introduction",
          component: Chat,
          children: [
            {
              name: "introduction",
              path: "/introduction",
              component: () => import("../views/QA/components/Introduction.vue"),
            },
            {
              name: "chat",
              path: "/chat",
              component: () => import("../views/QA/components/ChatList.vue"),
            },
          ]
        },
        // {
        //   name: "chat",
        //   path: "chat",
        //   component: Chat,
        // },
      ],
    },
  ],
});

export default router
