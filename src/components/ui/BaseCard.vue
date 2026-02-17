<template>
  <RouterLink :to="`/Detailpage/${article.id}`" style="text-decoration: none;"
    class="col-md-6 col-lg-4 mb-5"
    v-for="article in articles"
    :key="article.id"
  >
    <div class="yt-card">
      <div class="thumbnail-container">
        <img
          :src="article.thumbnail || 'https://via.placeholder.com/400x225?text=No+Image'"
          class="yt-thumbnail"
        />
        <span class="yt-category-badge">
          {{ article.category?.name || "General" }}
        </span>
      </div>

      <div class="d-flex mt-3">
        <div class="me-3">
          <img
            :src="article.creator?.avatar || 'https://ui-avatars.com/api/?name=' + article.creator?.firstName"
            class="rounded-circle author-avatar"
            alt="author"
          />
        </div>

        <div class="flex-grow-1">
          <h5 class="yt-title mb-1">
            {{ article.title }}
          </h5>
          
          <div class="yt-meta mb-2">
            {{ article.creator?.firstName }} {{ article.creator?.lastName }} • 
            {{ new Date(article.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }}
          </div>

          <p class="yt-description">
            {{ article.content }}
          </p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
<script setup>
const props = defineProps({
  articles: {
    type: Array,
    default: () => [],
  },
});
</script>
<style scoped>
.yt-card {
  transition: transform 0.2s ease-in-out;
}

.thumbnail-container {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f1f1f1;
}

.yt-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-avatar {
  width: 36px;
  height: 36px;
  object-fit: cover;
}


.yt-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f0f0f;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
}


.yt-description {
  font-size: 0.9rem;
  color: #606060;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.yt-meta {
  font-size: 0.85rem;
  color: #606060;
}

.yt-category-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background:red;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}
</style>