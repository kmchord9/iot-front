<script>
import { Line, mixins } from 'vue-chartjs'
import { getChartDataFormat, getChartOptionFormat, chartDataArray } from '../api/api'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    create: {
      type: String,
      default: null
    },
    device: {
      type: String,
      default: null
    },
    place: {
      type: String,
      default: null
    },
    physic: {
      type: String,
      default: null
    }
  },
  methods: {
    setChartData () {
      this.options = getChartOptionFormat()
      try {
        chartDataArray(this.physic, this.device, this.place, this.create)
          .then((res) => {
            this.chartData = getChartDataFormat(res[0], res[1])
          })
      } catch (e) {
        console.error(e)
      }
    },
    testlog (txt) {
      console.log(this.physic)
    }
  },
  mounted () {
    this.setChartData()
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped>
</style>
