<template>
  <div class="card">
    <h2>{{ sat.school_name }}</h2>
    <select v-model="selectedSat">
      <option v-for="item in sat" :key="item.id" :value="item.id">{{ item.name }}</option>
    </select>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue'
const sat = ref([])
async function getSat() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
    const data = await response.json()
    sat.value = data.results
  } catch (error) {
    console.log(error)
  }
}
onBeforeMount(() => {
  getSat()
})
</script>

<style scoped>
.container {
  width: 80vw;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
