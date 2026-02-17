<template>
  <div class="bg-light">
    <!-- Top Navbar -->
    <Navbar></Navbar>

    <div class="d-flex">
      <!-- Sidebar -->
      <Sidebar></Sidebar>

      <!-- Main Content -->
      <div class="flex-grow-1 content px-4 py-3">
        <!-- Page Title -->
        <div class="d-flex align-items-center justify-content-around mb-4">
          <h3 class="fw-bold text-light mb-0">Article List</h3>

          <!-- <button class="btn btn-primary">
            <i class="bi bi-plus-lg"></i> New Article
          </button> -->
          <div class="d-flex align-items-center">
            <input
              type="text"
              class="form-control w-100 me-2"
              v-model="search"
              placeholder="Search articles..."
            /><span class="input-group-text bg-light border-0"
              ><i class="bi bi-search text-muted"></i
            ></span>
          </div>
          <select class="form-select w-auto" v-model="sortDir">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div class="row g-4">
          <div class="row mb-4 mt-5">
            <div class="col-md-4">
              <div class="card p-3">
                <h6>Total Articles</h6>
                <h3 class="fw-bold">120</h3>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card p-3">
                <h6>Published</h6>
                <h3 class="fw-bold text-success">85</h3>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card p-3">
                <h6>Draft</h6>
                <h3 class="fw-bold text-warning">35</h3>
              </div>
            </div>
          </div>

          <BaseCard :articles="articleStore.articles" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import { useArticleStore } from "@/stores/articles";
import BaseCard from "@/components/ui/BaseCard.vue";
import { onMounted, ref, watch } from "vue";
const sortDir = ref("desc");
let articleStore = useArticleStore();
let search = ref("");
watch([search, sortDir], ([newSearch, newSort]) => {
  articleStore.fetchArticles({
    search: newSearch,
    sortDir: newSort,
  });
});

onMounted(async () => {
  await articleStore.fetchArticles({ sortDir: sortDir.value }); // ឈ្មោះនេះត្រូវតែមានក្នុង Store
});
</script>
