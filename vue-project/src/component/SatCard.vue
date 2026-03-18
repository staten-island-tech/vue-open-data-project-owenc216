<template>
  <div class="card">
    <h3>{{ sat.school_name }}</h3>
    <p>{{ sat.sat_math_avg_score }}</p>
    <p>{{ sat.sat_critical_reading_avg_score }}</p>
    <p>{{ sat.sat_writing_avg_score }}</p>
  </div>
</template>

<script setup>
defineProps({
  sat: Object,
})
</script>

<style lang="scss" scoped></style>
//? no value yet dont show anything wait until something is there
