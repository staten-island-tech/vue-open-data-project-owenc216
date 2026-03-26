<template>
  <div class="container">
    <h2>NYC SAT Results</h2>
    <input v-model="searchSchool" placeholder="Type school name" />
    <select v-model="selectedSchool">
      <option value="">Select a school</option>
      <option v-for="(school, index) in filteredOptions" :key="index" :value="school.school_name">
        {{ school.school_name }}
      </option>
    </select>

    <div v-if="selectedSchool" class="cards">
      <div v-for="(sat, index) in selectedList" :key="index" class="school-result">
        <SatCard :sat="sat" />
        <BarChart :sat="sat" />
      </div>
    </div>

    <p v-else class="prompt">Select a school above to see SAT results.</p>
  </div>
</template>

<script setup>
import BarChart from '@/components/BarChart.vue'
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
  } catch (error) {
    console.log(error)
  }
}

watch(searchSchool, function () {
  filteredOptions.value = Sat.value.filter((school) =>
    school.school_name.toLowerCase().includes(searchSchool.value.toLowerCase()),
  )
})

watch(selectedSchool, function () {
  selectedList.value = Sat.value.filter((school) => school.school_name === selectedSchool.value)
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
  align-items: center;
  justify-content: space-around;
}

.school-result {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.prompt {
  color: #888;
  margin-top: 20px;
  font-size: 1rem;
}
</style>
