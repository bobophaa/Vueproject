import { defineStore } from "pinia";
import api from "@/api/http";
import { ref } from "vue";

export const useArticleStore = defineStore("article", () => {
  const articles = ref([]);   
  const ownArticles = ref([]); 
  const pagination = ref({
    totalPages: 0,
    currentPage: 1,
  });

  
  async function fetchArticles({ search = "", sortBy = "createdAt", sortDir = "desc" } = {}) {
    try {
      const res = await api.get("/articles", {
        params: { search, sortBy, sortDir },
      });
      articles.value = res.data.data.items || [];
    } catch (error) {
      console.error("Fetch all articles error:", error);
    }
  }

  
  async function fetchOwnArticles(page = 1, per_page = 10) {
    try {
      const res = await api.get(`/articles/own?_page=${page}&_per_page=${per_page}`);
      ownArticles.value = res.data.data.items || [];
      pagination.value.totalPages = res.data.data.meta.totalPages || 0;
      pagination.value.currentPage = res.data.data.meta.currentPage || 1;
    } catch (error) {
      console.error("Fetch own articles error:", error);
    }
  }

  return { 
    articles, 
    ownArticles, 
    fetchArticles, 
    fetchOwnArticles, 
    pagination 
  };
});