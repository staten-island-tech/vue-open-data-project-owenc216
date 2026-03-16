<template>
  <div class="container">
    <input v-model="searchSchool" placeholder="Enter school name" />
    <SatCard v-for="(sat, index) in Sat" :key="index" :sat="sat" :id="index + 1" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SatCard from '@/components/SatCard.vue'
const Sat = ref([])
const searchSchool = ref('')
async function getSat() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
    const data = await response.json()
    Sat.value = data.results
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
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
