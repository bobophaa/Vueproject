import { createRouter, createWebHistory } from "vue-router";
// import HomeView from './HomeView.vue';
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import ArticleView from "@/views/ArticleView.vue";
import CreateArticle from "@/views/CreateArticle.vue";
import EditArticle from "@/views/EditArticle.vue";
import Detailpage from "@/views/Detailpage.vue";
import CategoryView from "@/views/CategoryView.vue";
import ProfileView from "@/views/ProfileView.vue";
import Category from "@/views/category.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { require: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/article",
      name: "article",
      component: ArticleView,
      meta: { require: true },
    },
    {
      path: "/Detailpage/:id",
      name: "Detailpage",
      component: Detailpage,
    },
    {
      path: "/article/create",
      name: "createArticle",
      component: CreateArticle,
      meta: { require: true },
    },
    {
      path: "/edit/:id",
      name: "EditArticle",
      component: EditArticle,
    },
    {
      path: "/pf",
      name: "Profile",
      component: ProfileView,
    }, 
    
    // {
    //   path: "/category",
    //   name: "Category",
    //   component: CategoryView,
    // },
    
    
    {
      path: "/category",
      name: "Category",
      component: Category,
    }, 
  ],
});

router.beforeEach((to, from) => {
  let auth = useAuthStore();

  if (!auth.isLoggedIn && to.meta.require) {
    return { name: "login" };
  }

  return true;
});

export default router;
