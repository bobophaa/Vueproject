<template>
  <div>
    <!-- Top Navbar -->
    <Navbar></Navbar>
    <div class="d-flex">
      <!-- Sidebar -->
      <Sidebar></Sidebar>
      <!-- Main Content -->
      <div class="content w-100">
        <h3>Article Page</h3>
        <div class="d-flex justify-content-end my-4">
          <router-link
            class="btn bg-primary text-light w-25"
            :to="{ name: 'createArticle' }"
          >
            Add Article
          </router-link>
        </div>
        <BaseTable
          :columns="columns"
          :rows="articleStore.ownArticles"
          @deleteArticle="handleDelete"
        >
          <template #col-thumbnail="{ value }">
            <img :src="value" alt="   " width="100px" />
          </template>
          <template #col-category="{ value }">
            <p>{{ value?.name || "Uncategorized" }}</p>
          </template>
        </BaseTable>
        <BasePagination
          :totalpages="articleStore.pagination.totalPages"
          :currentpage="articleStore.pagination.currentPage"
          @update:page="handlenextPage"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import Sidebar from "@/components/layout/Sidebar.vue";
import Navbar from "@/components/layout/Navbar.vue";
import { useArticleStore } from "@/stores/articles";
import { onMounted, reactive } from "vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import api from "@/api/http";
import router from "@/router";
import BasePagination from "@/components/ui/BasePagination.vue";
let articleStore = useArticleStore();

onMounted(async () => {
  await articleStore.fetchOwnArticles(1, 10);
});
let columns = [
  { label: "Id", key: "id" },
  { label: "Title", key: "title" },
  { label: "Content", key: "content" },
  { label: "Thumbnail", key: "thumbnail" },
  { label: "Category", key: "category" },
];
let pagination = reactive({
  currentPage: 1,
  itemPerPage: 10,
  totalItems: 10,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: true,
});
async function handleDelete(id) {
  if (!confirm("Are you sure you want to delete this article?")) return;
  try {
    await api.delete(`/articles/${id}`);

    await articleStore.fetchOwnArticles(
      articleStore.pagination.currentPage,
      10,
    );
  } catch (error) {
    console.error("Delete failed:", error.response);
  }
}

const handlenextPage = async (page) => {
  await articleStore.fetchOwnArticles(page, 10);
};
</script>
