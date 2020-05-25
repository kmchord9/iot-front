<script>
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-streaming'
import moment from 'moment'
import { chartLogData } from 'api'

export default {
  extends: Line,
  data: () => {
    return {
      factor: [],
      lastDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')
    }
  },
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
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
    chartDataArray_realtime () {
      chartLogData(this.physic, this.device, this.place, '', this.lastDate)
        .then(res => {
          res.data.slice(1).forEach((element) => {
            this.factor.push({
              t: new Date(element['created_at']),
              y: element['value']
            })
          })
        })
      if (this.factor.length) {
        this.lastDate = moment(this.factor.slice(-1)[0]['t']).format('YYYY-MM-DD HH:mm:ss.SSS')
      }
    }
  },
  mounted () {
    let label = `${this.place}の${this.physic}`
    this.renderChart({
      datasets: [{
        label: label,
        data: this.factor,
        borderColor: 'rgba(255,0,0,1)',
        backgroundColor: 'rgba(0,0,0,0)'
      }]
    }, {
      scales: {
        xAxes: [{
          type: 'realtime',
          realtime: {
            delay: 2000,
            refresh: 5000,
            duration: 300000,
            // onRefresh: function(chart) {
            //   chart.data.datasets.forEach(function(dataset) {
            //     dataset.data.push({
            //       x: Date.now(),
            //       y: Math.random()
            //     });
            //   });
            // }
            onRefresh: () => {
               this.chartDataArray_realtime()
            }
          }
        }],
        yAxes: [{
          ticks: {
            suggestedMax: 40,
            suggestedMin: 20,
            stepSize: 2
          }
        }]
      }
    })
  }
}
</script>

<style scoped>
</style>
