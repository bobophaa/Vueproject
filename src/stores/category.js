import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/http";
import { toast } from "vue3-toastify";
export const useCategoryStore = defineStore("category", () => {
  let categories = ref([]);
  let pagination = ref({
    totalPages: 0,
    currentPage: 1,
  });
async function fetchCategory(page = 1, per_page = 10) {
  isloading.value = true; // ១. ចាប់ផ្តើម Loading (បង្ហាញ Skeleton)
  try {
    let res = await api.get(`/categories?_page=${page}&_per_page=${per_page}`);
    categories.value = res.data.data.items;
    pagination.value = res.data.data.meta;
  } catch (error) {
    console.error(error);
  } finally {
    isloading.value = false; // ២. បញ្ឈប់ Loading (បង្ហាញទិន្នន័យពិត)
  }
}
  async function createCategory(name) {
    try {
      await api.post("/categories", { name });

      toast.success("create ban hx loy mes kon ke ");

      await fetchCategory(1, 10);
    } catch (error) {
      if (error.response) {
        toast.error("bro ah name ng mean ke dak hx");
      } else {
        toast.error("err hx ");
      }
    }
  }
  async function deleteCategory(id) {
    if (confirm("jg lob men ten men?")) {
      try {
        await api.delete(`/categories/${id}`);
        toast.success("lob ban hx loy mes ");

        await fetchCategory(pagination.value.currentPage, 10);
      } catch (error) {
        toast.error("err hx ");
      }
    }
  }
  let isloading = ref(false);

  return {
    categories,
    pagination,
    fetchCategory,
    createCategory,
    deleteCategory,
    isloading,
  };
});
