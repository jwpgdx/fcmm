import NotFoundPage from "@/pages/NotFoundPage.vue";

export default [
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFoundPage,
  },
];
