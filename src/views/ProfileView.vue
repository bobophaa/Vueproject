<template>
  <Navbar />
  <div class="d-flex">
    <Sidebar />
    <main class="flex-grow-1 p-4 bg-light min-vh-100">
      <div v-if="!authStore.user" class="text-center py-5">
        <div class="spinner-border   text-primary"></div>
        <p class="mt-2 text-muted">Loading your profile...</p>
      </div>

      <div v-else class="container max-width-800">
        <div class="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
          <div class="bg-primary" style="height: 100px;"></div>
          <div class="card-body text-center position-relative pt-0">
            <div class="avatar-container">
              <img :src="authStore.user.avatar" 
                   class="rounded-circle border border-4 border-white shadow-sm avatar-img" />
              <label class="btn btn-dark btn-sm rounded-circle position-absolute upload-btn" style="background-color: green;">
                <!-- <i class="bi bi-camera-fill"></i> -->
                <input type="file" hidden @change="handleFileUpload" accept="image/*">
              </label>
            </div>
            <h3 class="fw-bold mt-3 mb-0">{{ authStore.user.firstName }} {{ authStore.user.lastName }}</h3>
            <p class="text-muted small">{{ authStore.user.role }} Add bio....</p>
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4">
          <div class="card-body p-4 p-md-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="fw-bold m-0">Personal Information</h5>
              <button v-if="!isEditing" @click="isEditing = true" class="btn btn-outline-primary btn-sm px-4 rounded-pill">
                <i class="bi bi-pencil-square me-2"></i>Edit Profile
              </button>
            </div>

            <div v-if="!isEditing" class="row g-4">
              <div class="col-md-6">
                <label class="small text-muted mb-1">First Name</label>
                <div class="p-3 bg-light rounded-3 fw-semibold">{{ authStore.user.firstName }}</div>
              </div>
              <div class="col-md-6">
                <label class="small text-muted mb-1">Last Name</label>
                <div class="p-3 bg-light rounded-3 fw-semibold">{{ authStore.user.lastName }}</div>
              </div>
              <div class="col-12">
                <label class="small text-muted mb-1">Email Address</label>
                <div class="p-3 bg-light rounded-3 fw-semibold">{{ authStore.user.email }}</div>
              </div>
            </div>

            <form v-else @submit.prevent="saveProfile" class="row g-4">
              <div class="col-md-6">
                <label class="form-label small fw-bold">First Name</label>
                <input type="text" v-model="editForm.firstName" class="form-control form-control-lg border-primary-subtle">
              </div>
              <div class="col-md-6">
                <label class="form-label small fw-bold">Last Name</label>
                <input type="text" v-model="editForm.lastName" class="form-control form-control-lg border-primary-subtle">
              </div>
              <div class="col-12 d-flex gap-2 justify-content-end mt-4">
                <button type="button" @click="isEditing = false" class="btn btn-light px-4 rounded-pill">Cancel</button>
                <button type="submit" class="btn btn-primary px-4 rounded-pill shadow-sm" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

const authStore = useAuthStore();
const isEditing = ref(false);
const isLoading = ref(false);
const editForm = ref({ firstName: '', lastName: '' });

onMounted(async () => {
  await authStore.fetchProfile();
  if (authStore.user) {
    editForm.value.firstName = authStore.user.firstName;
    editForm.value.lastName = authStore.user.lastName;
  }
});

const saveProfile = async () => {
  isLoading.value = true;
  try {
    await authStore.updateProfile(editForm.value);
    isEditing.value = false;
  } catch (error) {
    alert("Failed to update profile.");
  } finally {
    isLoading.value = false;
  }
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  

  
    await authStore.uploadAvatar(file);
  
};
</script>

<style scoped>
.max-width-800 { max-width: 800px; margin: auto; }
.avatar-container { margin-top: -65px; display: inline-block; position: relative; }
.avatar-img { width: 130px; height: 130px; object-fit: cover; }
.upload-btn { bottom: 5px; right: 5px; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border: 3px solid #fff; }
</style>