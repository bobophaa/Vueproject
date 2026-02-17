<template>
  <Navbar></Navbar>
  <div class="d-flex">
    <Sidebar></Sidebar>

    <div class="content w-100 p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold">Category List</h3>
        <button class="btn btn-primary" @click="openCreate">
          Create New Category
        </button>
      </div>
      <BaseTable
        :columns="columns"
        :rows="categoryStore.categories"
        :isLoading="categoryStore.isloading"
        @editArticle="onOpenEdit"
        @deleteArticle="onOpenDelete"
      />
      <div class="mt-4 d-flex justify-content-center">
        <BasePagination
          :totalpages="categoryStore.pagination.totalPages"
          :currentpage="categoryStore.pagination.currentPage"
          @update:page="handlePageChange"
        />
      </div>
    </div>

    <BaseModal :title="titleModal" v-if="showModal" @close="showModal = false">
      <div class="mb-3">
        <label class="form-label fw-bold">Category Name</label>
        <input
          type="text"
          class="form-control"
          v-model="name"
          placeholder="Enter name..."
          @keyup.enter="handleSave"
        />
      </div>
      <template #footer>
        <button class="btn btn-outline-secondary" @click="showModal = false">
          Cancel
        </button>
        <button class="btn btn-primary px-4" @click="handleSave">
          Save Now
        </button>
      </template>
    </BaseModal>

    <BaseModal
      title="Confirm Delete"
      v-if="showDeleteModal"
      @close="showDeleteModal = false"
    >
      <div class="text-center p-3">
        <p>pkot jit hah</p>
      </div>
      <template #footer>
        <button
          class="btn btn-outline-secondary"
          @click="showDeleteModal = false"
        >
          Cancel
        </button>
        <button class="btn btn-danger px-4" @click="confirmDelete">
          Delete Now
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/api/http";
import { notify } from "@/utils/toast";
import { useCategoryStore } from "@/stores/mycategory";
import BaseModal from "@/components/ui/BaseModal.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import BasePagination from "@/components/ui/BasePagination.vue";

const categoryStore = useCategoryStore();
const per_page = ref(10);
const name = ref("");
const showModal = ref(false);
const showDeleteModal = ref(false);
const titleModal = ref("Create Category");
const isEdit = ref(false);
const currentId = ref(null);

const columns = [
  { label: "ID", key: "id" },
  { label: "Category Name", key: "name" },
];

onMounted(() => categoryStore.fetchCategory(1, per_page.value));

const handlePageChange = (page) =>
  categoryStore.fetchCategory(page, per_page.value);

const openCreate = () => {
  isEdit.value = false;
  name.value = "";
  titleModal.value = "Create Category";
  showModal.value = true;
};

const onOpenEdit = (item) => {
  isEdit.value = true;
  currentId.value = item.id;
  name.value = item.name;
  titleModal.value = "Update Category";
  showModal.value = true;
};

const handleSave = async () => {
  if (!name.value) return notify.error("Name is required");
  try {
    if (isEdit.value) {
      await api.put(`/categories/${currentId.value}`, { name: name.value });
      notify.success("Updated successfully!");
    } else {
      await api.post("/categories", { name: name.value });
      notify.success("Created successfully!");
    }
    showModal.value = false;
    categoryStore.fetchCategory(
      categoryStore.pagination.currentPage,
      per_page.value,
    );
  } catch (e) {
    notify.error("Operation failed!");
  }
};

const onOpenDelete = (id) => {
  currentId.value = id;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  try {
    await api.delete(`/categories/${currentId.value}`);
    notify.success("Deleted successfully!");
    showDeleteModal.value = false;
    categoryStore.fetchCategory(
      categoryStore.pagination.currentPage,
      per_page.value,
    );
  } catch (e) {
    notify.error("Delete failed!");
  }
};
</script>
