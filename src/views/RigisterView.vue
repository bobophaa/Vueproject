<template>
  <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card shadow-sm border-0">
            <div class="card-body p-5">
              <h2 class="fw-bold mb-4 text-center">Create Account</h2>

              <form @submit.prevent="handleRegister">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">First Name</label>
                    <input v-model="form.firstName" type="text" class="form-control" required />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Last Name</label>
                    <input v-model="form.lastName" type="text" class="form-control" required />
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Email address</label>
                  <input v-model="form.email" type="email" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input v-model="form.password" type="password" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">Confirm Password</label>
                  <input v-model="form.confirmPassword" type="password" class="form-control" required />
                </div>

                <div class="d-grid mt-4">
                  <button type="submit" class="btn btn-primary btn-lg">Sign Up</button>
                </div>

                <p class="text-center mt-4 mb-0">
                  Already have an account? 
                  <RouterLink to="/login" class="text-decoration-none">Login</RouterLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useauthStore from "@/stores/auth";

const router = useRouter();
const auth = useauthStore();

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

async function handleRegister() {
  await auth.register(form.value); 
  router.push("/login"); 
 
  if (form.value.password !== form.value.confirmPassword) {
  
    return;
  }

 
}
</script>