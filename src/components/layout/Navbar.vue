<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-danger shadow-sm sticky-top py-2 px-4"
  >
    <div
      class="container-fluid d-flex justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center">
        <div
          class=" text-white rounded-3 p-2 me-3 d-flex align-items-center justify-content-center" style=" width: 40px; height: 40px"
        
        >
          <i class="bi bi-journal-text fs-2 " style="color: orange;"></i>
        </div>
        
        <span
          class="navbar-brand fw-bold m-0 p-0 text-light"
          style="letter-spacing: -0.5px"
        >
          Article<span class="text-black ms-1 p-1 rounded-1" style="background-color: orange;">Hub</span>
        </span>
      </div>

      <div class="d-none d-md-flex mx-4 flex-grow-1 justify-content-center">
        <div class="input-group" style="max-width: 400px">
          <!-- <span class="input-group-text bg-light border-0"
            ><i class="bi bi-search text-muted"></i
          ></span> -->
          <!-- <input
            type="text"
            class="form-control bg-light border-0"
            placeholder="Search articles..."
          /> -->
        </div>
      </div>

      <div class="d-flex align-items-center gap-3 ">
        <button
          class="btn btn-light rounded-circle position-relative p-2 d-flex align-items-center justify-content-center bg-danger border-0"
          style="width: 40px; height: 40px"
        >
          <i class="bi bi-bell text-light fs-5 "></i>
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white p-1"
          >99+
            <span class="visually-hidden">unread messages</span>
          </span>
        </button>

        <div
          class="vr mx-1 my-2 text-light opacity-25"
          style="height: 25px"
        ></div>

        <div class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center text-decoration-none dropdown-toggle hide-arrow"
            id="profileDropdown"
            data-bs-toggle="dropdown"
          >
            <div class="me-2 text-end d-none d-sm-block">
              <div class="fw-bold text-light small">
                {{ authStore.user?.firstName  }}
                {{ authStore.user?.lastName  }}
              </div>
              <div class="text-light" style="font-size: 11px">
                {{ authStore.user?.role || "Member" }} Account
              </div>
            </div>
            <img
              :src="
                authStore.user?.avatar ||
                'https://i.pinimg.com/736x/96/d8/ed/96d8ed49fa26c56532470aa2570a8c42.jpg'
              "
              class="rounded-circle border border-2 border-primary shadow-sm"
              style="width: 40px; height: 40px; object-fit: cover"
            />
          </a>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
            <li>
              <router-link class="dropdown-item py-2" to="/pf">
                <i class="bi bi-person me-2"></i> Profile
              </router-link>
            </li>
            <li>
              <a class="dropdown-item py-2" href="#"
                ><i class="bi bi-gear me-2"></i> Settings</a
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a
                class="dropdown-item py-2 text-danger"
                href="#"
                @click.prevent="handleLogout"
              >
                <i class="bi bi-box-arrow-right me-2"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.417) !important;
}
.dropdown-toggle::after {
  display: none;
}
.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #0d6efd;
}
.btn-light:hover {
  background-color: #e9ecef;
}
</style>
