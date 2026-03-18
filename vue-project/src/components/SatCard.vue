<template>
  <div class="card">
    <h3>School Name: {{ props.sat.school_name }}</h3>
    <p>SAT Math Average Score: {{ props.sat.sat_math_avg_score }}</p>
    <p>SAT Critical Reading Average Score: {{ props.sat.sat_critical_reading_avg_score }}</p>
    <p>SAT Writing Average Score: {{ props.sat.sat_writing_avg_score }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  sat: Object,
})
</script>

<style lang="scss" scoped></style>
//? no value yet dont show anything wait until something is there
