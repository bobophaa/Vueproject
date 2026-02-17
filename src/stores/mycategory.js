import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import api from "@/api/http";
export const useCategoryStore = defineStore ("category", ()=>{
    // State management
    let categories = ref([]);
   let pagination = reactive({
      currentPage: 1,
      itemPerPage: 10,
      totalItems: 10,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    });

    // Action
    async function fetchCategory(page, per_page) {
        let res = await api.get(`/categories?_page=${page}&_per_page=${per_page}`);
      categories.value = res.data.data.items;
      pagination.totalItems = res.data.data.meta.totalItems;
      pagination.totalPages = res.data.data.meta.totalPages;
      pagination.currentPage = res.data.data.meta.currentPage;
        // console.log(categories.value);

        
             
    }
    // let columns = [
    //   { name: "id", label: "ID" },
    //   { name: "name", label: "Name" },
    //   { name: "description", label: "Description" },
    // ];
    // Return
    return {fetchCategory, categories,pagination}

})