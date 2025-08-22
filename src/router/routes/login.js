import LoginPage from '@/pages/LoginPage.vue'

export default [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      requiresAuth: false,
      header: false,
      headerOverlap: false,
      footer: false,
    },
  },
];
