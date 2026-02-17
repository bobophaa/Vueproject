<template>
  <div>
    <section
      class="vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-5">
            <div class="card shadow-sm border-0">
              <div class="card-body p-5">
                <h2 class="fw-bold mb-4 text-center">Login</h2>

                <form @submit.prevent="handleLogin">
                  <div class="mb-3">
                    <label for="emailInput" class="form-label"
                      >Email address</label
                    >
                    <input
                      v-model="email"
                      type="text"
                      class="form-control"
                      id="emailInput"
                      placeholder=""
                    />
                    <p class="text-danger" v-if="err.email">{{ err.email }}</p>
                  </div>

                  <div class="mb-3">
                    <label for="passwordInput" class="form-label"
                      >Password</label
                    >
                    <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      id="passwordInput"
                    />
                    <p class="text-danger">{{ err.password }}</p>
                  </div>

                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="rememberMe"
                      />
                      <label class="form-check-label" for="rememberMe"
                        >Remember me</label
                      >
                    </div>
                    <a href="#" class="text-decoration-none small"
                      >Forgot password?</a
                    >
                  </div>

                  <div class="d-grid">
                    <button
                      :disabled="isloading"
                      type="submit"
                      class="btn btn-primary btn-lg"
                    >
                      <div
                        class="spinner-border spinner-border-sm"
                        role="status"
                        v-if="isloading"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      <div v-else>Sign In</div>
                    </button>
                  </div>

                  <p class="text-center mt-4 mb-0">
                    Don't have an account?
                    <a href="#" class="text-decoration-none">Sign Up</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { isEmail } from "@/utils/validate";
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import { required, validater } from "@/utils/validate";
import "vue3-toastify/dist/index.css";
import { toast } from "vue3-toastify";
let email = ref("");
let password = ref("");
let auth = useAuthStore();

let err = reactive({
  email: "",
  password: "",
});
let isloading = ref(false);
function validate() {
  err.email = validater(email.value, [
    (v) => required(v, "email is required"),
    (v) => isEmail(v, "email is wrong format"),
  ]);

  // err.email = required(email.value, "email is required");
  err.password = required(password.value, "password is required");

  return !err.email && !err.password;
}
async function handleLogin() {
  console.log(email.value);
  if (!validate()) return;
  isloading.value = true;
  try {
    await auth.login(email.value, password.value);
    toast.success("Login successful!");
    router.push("/");
  } catch (error) {
    toast.error("Login failed. Please try again.");

    console.error("Login failed. Please  try again.");
    isloading.value = false;
  } finally {
  }
  // if (!validate()) return;
  // await auth.login(email.value, password.value);
  // router.push("/");
}
</script>
