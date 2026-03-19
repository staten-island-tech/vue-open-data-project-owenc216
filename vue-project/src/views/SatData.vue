<template>
  <div class="container">
    <h2>NYC Sat Results</h2>
    <input v-model="searchSchool" placeholder="Type school name" />
    <select v-model="selectedSchool">
      <option value="">select a school</option>
      <option v-for="(school, index) in filteredOptions" :key="index" :value="school.school_name">
        {{ school.school_name }}
      </option>
    </select>
    <div class="cards">
      <SatCard v-for="(sat, index) in selectedList" :key="index" :sat="sat" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import SatCard from '@/components/SatCard.vue'
const Sat = ref([])
const searchSchool = ref('')
const selectedSchool = ref('')
const selectedList = ref([])
const filteredOptions = ref([])

async function getSat() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
    const data = await response.json()
    Sat.value = data
    filteredOptions.value = data
    selectedList.value = data
  } catch (error) {
    console.log(error)
  }
}
watch(searchSchool, function () {
  filteredOptions.value = []

  for (let i = 0; i < Sat.value.length; i++) {
    let school = Sat.value[i]

    if (school.school_name.toLowerCase().includes(searchSchool.value.toLowerCase())) {
      filteredOptions.value.push(school)
    }
  }
})
watch(selectedSchool, function () {
  selectedList.value = []

  for (let i = 0; i < Sat.value.length; i++) {
    let school = Sat.value[i]

    if (school.school_name === selectedSchool.value) {
      selectedList.value.push(school)
    }
  }
})
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
  align-items: center;x
  justify-content: space-around;
}
</style>
