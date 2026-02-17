<template>
  <Navbar></Navbar>
  <div class="d-flex">
    <Sidebar></Sidebar>
    <div class="content flex-grow-1 p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>All Categories</h2>
        <button class="btn btn-primary" @click="toggleModal">
          Create New Category
        </button>
      </div>

<BaseTable 
  :columns="columns" 
  :rows="catStore.categories" 
  @deleteArticle="catStore.deleteCategory" 
/>
      <BasePagination
        v-if="catStore.pagination"
        :totalPages="catStore.pagination.totalPages || 0"
        :current="catStore.pagination.currentPage || 1"
        @update:page="nextpage"
        @previous:page="nextpage"
      />
    </div>
  </div>

  <BaseModal v-model="open" title="Create New Category">
    <template #body>
      <input type="text" v-model="newCategoryName" class="form-control" />
    </template>
    <template #footer>
      <button type="button" class="btn btn-secondary" @click="open = false">
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="handleSave">
        Save
      </button>
    </template>
  </BaseModal>
</template>

<script setup>

import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import BasePagination from "@/components/ui/BasePagination.vue";
import { useCategoryStore } from "@/stores/category";
import { onMounted, reactive, ref } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
const catStore = useCategoryStore();
const per_page = ref(10);
const open = ref(false);
const newCategoryName = ref("");

onMounted(async () => {
  await catStore.fetchCategory(1, per_page.value); 
});
const columns = reactive([
  { label: "Id", key: "id" },
  { label: "Name", key: "name" },
]);

const nextpage = async (page) => {
  await catStore.fetchCategory(page, per_page.value);
};

function toggleModal() {
  open.value = !open.value;
  newCategoryName.value = "";
}

const handleSave = async () => {
  if (newCategoryName.value) {
    await catStore.createCategory(newCategoryName.value);
    toggleModal();
  } 
};
async function handleDelete(id) {
  if (!confirm("Are you sure you want to delete this article?")) return;
  
  try {
    await api.delete(`/categories/${id}`); 
    
    await catStore.fetchCategory(catStore.pagination.currentPage, per_page.value);
  } catch (error) {
    console.error("Delete failed:", error.response); 
  }
}
</script>
