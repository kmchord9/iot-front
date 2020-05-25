<template>
    <section class="container">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="realtime">Realtime</router-link></li>
          <li><router-link to="log">Log</router-link></li>
        </ul>
        <h1>Demo examples</h1>
        <div class="columns">
            <div class="column">
                <h3>Line Chart</h3>
                <real
                  :device="'BME280'"
                  :place="'部屋001'"
                  :physic="'温度'"/>
            </div>
            <div class="column">
                <h3>Line Chart</h3>
                <real
                  :device="'BME280'"
                  :place="'部屋001'"
                  :physic="'湿度'"/>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <h3>Line Chart</h3>
                <real/>
            </div>
            <div class="column">
                <h3>Line Chart</h3>
            </div>
        </div>
    </section>
</template>

<script>
import Real from 'RealtimeChart'

export default {
  name: 'Realtime',
  components: {
    Real
  },
  data () {
    return {
    }
  },
  created () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.dataContents = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Data reractive',
            backgroundColor: '#f8b979',
            data: [this.getRandomNum(), this.getRandomNum(), this.getRandomNum(), this.getRandomNum(), this.getRandomNum(), this.getRandomNum(), this.getRandomNum(), this.getRandomNum(), this.getRandomNum(), this.getRandomNum(), this.getRandomNum(), this.getRandomNum()]
          }
        ]
      }
    },
    getRandomNum () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
