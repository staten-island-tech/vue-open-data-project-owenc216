<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
const props = defineProps({
  sat: {
    type: Object,
    required: true,
  },
})
console.log(props.sat)
const data = props.sat
const math = ref(0)
function mathScores(data) {
  let mathscore = 0
  data.forEach((score) => {
    mathscore += score.sat_math_avg_score
  })
  return mathscore / data.length
}
math.value = mathScores(data)
console.log(math.value)
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { ref } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['Math', 'English', 'Writing'],
        datasets: [
          {
            data: [math.value, 100, 100],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    }
  },
}
</script>
