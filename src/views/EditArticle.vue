<template>
  <div>
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="row justify-content-center w-100 my-5">
        <div class="col-12 col-md-10 col-lg-6">
          <div class="card p-4 shadow-sm">
            <h5 class="fw-bold mb-3">Edit Article</h5>
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label class="form-label">Article Title</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.title"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Category</label>
                <select class="form-select" v-model="form.categoryId" required>
                  <option value="" disabled>Choose category</option>
                  <option
                    v-for="cat in categoryStore.categories"
                    :key="cat.id"
                    :value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Thumbnail Image</label>
                <div v-if="currentImage" class="mb-2 text-center">
                  <img
                    :src="currentImage"
                    class="rounded border shadow-sm"
                    style="width: 200px; height: 120px; object-fit: cover"
                  />
                </div>
                <input
                  type="file"
                  @change="handleFile"
                  class="form-control"
                  accept="image/*"
                />
              </div>

              <div class="mb-3">
                <labe class="form-label">Content</labe>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="form.content"
                  required
                ></textarea>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  @click="$router.push('/article')"
                  class="btn btn-outline-secondary"
                >
                  Cancel
                </button>
                <button type="submit" class="btn btn-info text-white px-4">
                  Update Article
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "@/stores/category";
import api from "@/api/http";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();

const form = ref({
  title: "",
  content: "",
  categoryId: "",
});

const file = ref(null);
const currentImage = ref("");

onMounted(async () => {
  await categoryStore.fetchCategory();

  const res = await api.get(`/articles/${route.params.id}`);
  const article = res.data.data;

  form.value.title = article.title;
  form.value.content = article.content;
  form.value.categoryId = article.category?.id;
  currentImage.value = article.thumbnail;
});

const handleFile = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) file.value = selectedFile;
};

const handleUpdate = async () => {
  const payload = {
    title: form.value.title,
    content: form.value.content,
    categoryId: Number(form.value.categoryId),
  };

  console.log("Updating with payload:", payload);

  await api.put(`/articles/${route.params.id}`, payload);

  if (file.value) {
    const formData = new FormData();
    formData.append("thumbnail", file.value);
    await api.post(`/articles/${route.params.id}/thumbnail`, formData);
  }

  alert("Update Successful!");
  router.push("/article");
};
</script>
