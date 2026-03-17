<template>
  <router-link :to="satPath" class="card">
    <h2>{{ sat.name }}</h2>
    <h3>{{ id }}</h3>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  sat: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})
const satPath = computed(() => {
  return `/sat/${props.sat.school_name}`
})
</script>

<style scoped>
.card {
  width: 28%;
  height: 500px;
  background-color: aliceblue;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  text-transform: uppercase;
}
img {
  width: 100%;
  height: 80%;
  object-fit: cover;
}
</style>
//? no value yet dont show anything wait until something is ther
