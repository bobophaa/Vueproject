<template>
  <nav aria-label="Page navigation example" v-if="totalpages > 1">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#" @click="previouspage">Previous</a></li>
      <li class="page-item" v-for="(value, index) in totalpages" :class="{ active: value === currentpage }"    :key="index">
        <a class="page-link" href="#" @click="pagenumber(value)">{{ value }} </a>
      </li>
      <!-- <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li> -->
      <li class="page-item" @click="nextpage">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>
<script setup>
import { ref, watch } from "vue";
let emit = defineEmits(["update:page"]);
let props = defineProps({
  totalpages: {
    type: Number,
    default: 0,
  },
  currentpage: {
    type: Number,
    default: 1,
  },
});
watch(
  () => props.currentpage,
  (newVal) => {
    currentPage.value = newVal;
  },
);

let currentPage = ref(props.currentpage);
function nextpage() {
  //   console.log(props.currentpage);
  if (currentPage.value < props.totalpages) {
    let page = (currentPage.value += 1);
    emit("update:page", page);
    console.log(currentPage.value);
  }
}
function previouspage() {
  if (currentPage.value > 1) {
    let page = (currentPage.value -= 1);
    emit("update:page", page);
    console.log(currentPage.value);
  }
}
function pagenumber(page) {
  emit("update:page", page);
}

</script>
