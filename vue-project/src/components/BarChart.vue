<template>
  <div class="charts-container">
    <div class="chart-wrapper" v-for="subject in subjects" :key="subject.key">
      <h3>{{ subject.label }}</h3>
      <div class="bar-chart">
        <div class="bar-track">
          <div
            class="bar"
            :style="{ width: getPercent(subject.key) + '%', backgroundColor: subject.color }"
          ></div>
        </div>
        <span class="score-label">{{ props.sat[subject.key] ?? 'N/A' }}</span>
      </div>
      <div class="axis-labels">
        <span>0</span>
        <span>400</span>
        <span>800</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  sat: {
    type: Object,
    required: true,
  },
})

const subjects = [
  { key: 'sat_math_avg_score', label: 'Math', color: '#4f86f7' },
  { key: 'sat_critical_reading_avg_score', label: 'Reading', color: '#f7a84f' },
  { key: 'sat_writing_avg_score', label: 'Writing', color: '#6fcf7a' },
]

function getPercent(key) {
  const score = parseFloat(props.sat[key])
  if (isNaN(score)) return 0
  // SAT scores range from 200–800
  return ((score - 200) / 600) * 100
}
</script>

<style scoped>
.charts-container {
  width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 10px 0;
}

.chart-wrapper h3 {
  margin: 0 0 8px;
  font-size: 0.9rem;
  color: #555;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.bar-chart {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-track {
  flex: 1;
  height: 24px;
  background: #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
}

.bar {
  height: 100%;
  border-radius: 12px;
  transition: width 0.6s ease;
  min-width: 4px;
}

.score-label {
  font-weight: 700;
  font-size: 1rem;
  color: #333;
  min-width: 36px;
  text-align: right;
}

.axis-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: #aaa;
  margin-top: 4px;
  padding-right: 48px;
}
</style>
