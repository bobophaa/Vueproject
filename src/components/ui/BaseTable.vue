<template>
  <table class="table table-bordered table-hover">
    <thead class="table-light">
      <tr>
        <td v-for="col in columns" :key="col.key">{{ col.label }}</td>
        <td class="text-center">Action</td>
      </tr>
    </thead>
    <tbody>
      <template v-if="isLoading">
        <tr v-for="n in 5" :key="'skeleton-' + n">
          <td :colspan="columns.length + 1">
            <div class="placeholder-glow">
              <span class="placeholder bg-secondary col-12"></span>
            </div>
          </td>
        </tr>
      </template>

      <template v-else>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="col in columns" :key="col.key">
            <slot :name="`col-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-secondary me-2" @click="$emit('editArticle', row)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" @click="$emit('deleteArticle', row.id)">Delete</button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false }, 
});
defineEmits(["deleteArticle", "editArticle"]);
</script>