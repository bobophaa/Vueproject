<template>
  <div class="sidebar d-flex flex-column p-3 bg-dark text-white shadow">
    <!-- <div class="brand-section d-flex align-items-center mb-4 px-2">
      <div class="bg-primary rounded-3 p-2 me-2">
        <i class="bi bi-grid-1x2-fill text-white"></i>
      </div>
      <h5 class="m-0 fw-bold tracking-tight">Admin<span class="text-primary">Hub</span></h5>
    </div> -->

    <div class="nav flex-column gap-1 flex-grow-1">
      <router-link :to="{name:'home'}" class="nav-link" active-class="active">
        <i class="bi bi-speedometer2 me-2"></i> Dashboard
      </router-link>
      
      <router-link :to="{name:'article'}" class="nav-link" active-class="active">
        <i class="bi bi-journal-text me-2"></i> Articles
      </router-link>

      <router-link :to="{name:'Category'}" class="nav-link" active-class="active">
        <i class="bi bi-tags me-2"></i> Categories
      </router-link>

      <a href="#" class="nav-link">
        <i class="bi bi-people me-2"></i> Users
      </a>
      
      <div class="nav-label mt-4 mb-2 text-uppercase opacity-50 small fw-bold">System</div>
      
      <a href="#" class="nav-link">
        <i class="bi bi-gear me-2"></i> Settings
      </a>
    </div>

    <div class="mt-auto pt-3 border-top border-secondary">
      <a href="#" @click.prevent="handleLogout" class="nav-link text-danger-hover">
        <i class="bi bi-box-arrow-left me-2"></i> Logout
      </a>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await auth.logout();
  router.push("/login");
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  transition: all 0.3s ease;
}

/* Base Link Style */
.nav-link {
  color: rgba(255, 255, 255, 0.7);
  padding: 12px 15px;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

/* Hover & Active States */
.nav-link:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  color: #000000;
  background-color: rgb(255, 255, 255); /* Bootstrap Primary */
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
}

/* Section Labels */
.nav-label {
  font-size: 0.7rem;
  letter-spacing: 1px;
  padding-left: 15px;
}

/* Custom Logout Hover */
.text-danger-hover:hover {
  color: #ff4d4d !important;
  background-color: rgba(255, 77, 77, 0.1);
}
</style>