<template>
  <div>
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="container py-5">

        <div v-if="article" class="detail-article card p-4 shadow-sm rounded-4">
          <h3 class="fw-bold mb-3 text-primary">{{ article.title }}</h3>

          <img
            :src="article.thumbnail"
            class="img-fluid rounded-4 shadow-sm mb-4"
            style="object-fit: cover; width: 100%; height: 500px"
          />

          <div class="d-flex align-items-center gap-3 mb-4">
            <img
              :src="article.creator.avatar"
              class="rounded-circle shadow-sm"
              width="40"
              height="40"
            />
            <div>
              <div class="fw-semibold">
                {{ article.creator.firstName }} {{ article.creator.lastName }}
              </div>
              <small class="text-muted">
                Published on
                {{ new Date(article.createdAt).toLocaleDateString() }}
              </small>
            </div>
          </div>

          <div class="article-content text-info" style="white-space: pre-wrap">
            {{ article.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; 
import api from "@/api/http"; 
import Sidebar from "@/components/layout/Sidebar.vue";
import Navbar from "@/components/layout/Navbar.vue";

const route = useRoute();
const article = ref(null);

onMounted(async () => {
 
    const id = route.params.id;
    console.log("Article ID:", id   );
    

    const res = await api.get(`/articles/${id}`);

    article.value = res.data.data;
  } );
</script>
