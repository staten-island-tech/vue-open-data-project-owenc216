<template>
  <div class="avg-container">
    <h2 class="avg-title">NYC Citywide SAT Averages (All Schools)</h2>
    <div v-if="loading" class="loading">Loading averages...</div>
    <div v-else class="pie-wrapper">
      <svg viewBox="0 0 200 200" class="pie-svg">
        <circle cx="100" cy="100" r="80" fill="#f0f0f0" />
        <path
          v-for="(slice, i) in slices"
          :key="i"
          :d="slice.path"
          :fill="slice.color"
          class="slice"
        />
        <circle cx="100" cy="100" r="48" fill="white" />
        <text x="100" y="95" text-anchor="middle" class="center-label-top">Total Avg</text>
        <text x="100" y="113" text-anchor="middle" class="center-label-score">{{ totalAvg }}</text>
      </svg>

      <div class="legend">
        <div v-for="subject in subjects" :key="subject.key" class="legend-item">
          <span class="legend-dot" :style="{ backgroundColor: subject.color }"></span>
          <span class="legend-label">{{ subject.label }}</span>
          <span class="legend-score">{{ averages[subject.key] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const loading = ref(true)
const averages = ref({
  sat_math_avg_score: 0,
  sat_critical_reading_avg_score: 0,
  sat_writing_avg_score: 0,
})

const subjects = [
  { key: 'sat_math_avg_score', label: 'Math', color: '#4f86f7' },
  { key: 'sat_critical_reading_avg_score', label: 'Reading', color: '#f7a84f' },
  { key: 'sat_writing_avg_score', label: 'Writing', color: '#6fcf7a' },
]

const totalAvg = computed(() => {
  const vals = subjects.map((s) => averages.value[s.key])
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
})

const slices = computed(() => {
  const total = subjects.reduce((sum, s) => sum + averages.value[s.key], 0)
  let startAngle = -Math.PI / 2
  const cx = 100
  const cy = 100
  const r = 80

  return subjects.map((s) => {
    const value = averages.value[s.key]
    const angle = (value / total) * 2 * Math.PI
    const endAngle = startAngle + angle
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const largeArc = angle > Math.PI ? 1 : 0

    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
    startAngle = endAngle

    return { path, color: s.color }
  })
})

async function fetchAverages() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json')
    const data = await response.json()
    const keys = ['sat_math_avg_score', 'sat_critical_reading_avg_score', 'sat_writing_avg_score']
    keys.forEach((key) => {
      const values = data.map((s) => parseFloat(s[key])).filter((v) => !isNaN(v))
      averages.value[key] = Math.round(values.reduce((a, b) => a + b, 0) / values.length)
    })
    loading.value = false
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}

onMounted(() => fetchAverages())
</script>

<style scoped>
.avg-container {
  width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  margin: 20px 0;
}

.avg-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 20px;
}

.pie-wrapper {
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.pie-svg {
  width: 220px;
  height: 220px;
  flex-shrink: 0;
}

.slice {
  transition: opacity 0.2s;
  cursor: pointer;
}

.slice:hover {
  opacity: 0.85;
}

.center-label-top {
  font-size: 10px;
  fill: #999;
  font-family: sans-serif;
}

.center-label-score {
  font-size: 18px;
  font-weight: 700;
  fill: #333;
  font-family: sans-serif;
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.legend-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-label {
  font-size: 0.95rem;
  color: #555;
  font-weight: 600;
  width: 70px;
}

.legend-score {
  font-size: 0.95rem;
  font-weight: 700;
  color: #333;
}

.loading {
  color: #aaa;
  font-size: 0.9rem;
}
</style>
