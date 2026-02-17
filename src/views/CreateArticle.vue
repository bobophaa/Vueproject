<template>
  <div>
    <Navbar></Navbar>
    <div class="d-flex">
      <Sidebar></Sidebar>
      <div class="row justify-content-center w-100 my-5">
        <div class="col-12 col-md-10 col-lg-6">
          <div class="card p-4 shadow-sm border-0">
            <h5 class="fw-bold mb-3">Create New Article</h5>
            <form @submit.prevent="handleCreate">
              <div class="mb-3">
                <label class="form-label"
                  >Article Title <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.title }"
                  placeholder="Enter article title"
                  v-model="form.title"
                />
                <div class="invalid-feedback">{{ errors.title }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label"
                  >Category <span class="text-danger">*</span></label
                >
                <select
                  class="form-select"
                  :class="{ 'is-invalid': errors.categoryId }"
                  v-model="form.categoryId"
                >
                  <option value="" disabled>Choose category</option>
                  <option
                    v-for="category in categoryStore.categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <div class="invalid-feedback">{{ errors.categoryId }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label"
                  >Thumbnail Image <span class="text-danger">*</span></label
                >
                <input
                  type="file"
                  @change="handleFile"
                  class="form-control"
                  :class="{ 'is-invalid': errors.file }"
                />
                <div class="invalid-feedback">{{ errors.file }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label"
                  >Content <span class="text-danger">*</span></label
                >
                <textarea
                  class="form-control"
                  :class="{ 'is-invalid': errors.content }"
                  rows="5"
                  placeholder="Write your article content..."
                  v-model="form.content"
                ></textarea>
                <div class="invalid-feedback">{{ errors.content }}</div>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  @click="$router.push('/article')"
                  class="btn btn-outline-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-primary px-4"
                  :disabled="loading"
                >
                  <span
                    v-if="loading"
                    class="spinner-border spinner-border-sm me-1"
                  ></span>
                  Publish Article
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
import Sidebar from "@/components/layout/Sidebar.vue";
import Navbar from "@/components/layout/Navbar.vue";
import { useCategoryStore } from "@/stores/category";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/http";
import { toast } from "vue3-toastify";
import { notify } from "@/utils/toast";

const categoryStore = useCategoryStore();
const router = useRouter();
const loading = ref(false);

const form = ref({
  title: "",
  content: "",
  categoryId: "",
});

const file = ref(null);
const errors = ref({});

onMounted(async () => {
  await categoryStore.fetchCategory(1, 100);
});

const handleFile = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
    errors.value.file = "";
  }
};

const validateForm = () => {
  errors.value = {};

  if (!form.value.title.trim()) {
    errors.value.title = "Title is required.";
  } else if (form.value.title.length < 5) {
    errors.value.title = "Title must be at least 5 characters.";
  }

  if (!form.value.categoryId) {
    errors.value.categoryId = "Please select a category.";
  }

  if (!file.value) {
    errors.value.file = "Thumbnail image is required.";
  }

  if (!form.value.content.trim()) {
    errors.value.content = "Content cannot be empty.";
  } else if (form.value.content.length < 20) {
    errors.value.content = "Content must be at least 20 characters.";
  }

  return Object.keys(errors.value).length === 0;
};

const handleCreate = async () => {
  if (!validateForm()) return;
  loading.value = true;
  try {
    let res = await api.post("/articles", form.value);
    let articleID = res.data.data.id;

    if (file.value) {
      let formData = new FormData();
      formData.append("thumbnail", file.value);
      await api.post(`/articles/${articleID}/thumbnail`, formData);
    }
    notify.success("Article created successfully! 🎉");

   
    setTimeout(() => {
      router.push("/article");
    }, 3000);
    //  toast.success("create ban hx loy mg hahhhh", {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 5000,

    //  });
    // router.push('/article');
  } catch (err) {
    console.error("Create failed:", err.response?.data || err);
    if (err.response?.status === 409) {
      errors.value.title = "This title already exists.";
    } else {
      alert("Something went wrong. Please try again.");
    }
  } finally {
    loading.value = false;
  }
};
</script>
