import axios from 'axios'
// import moment from 'moment'

const BASE_URL = process.env.VUE_APP_HOST_URL
const MY_NAME = process.env.VUE_APP_MYNAME
const MY_PASS = process.env.VUE_APP_MYPASS

const client = axios.create({
  method: 'GET',
  baseURL: `${BASE_URL}/api`,
  resposeType: 'json',
  auth: {username: MY_NAME, password: MY_PASS},
  timeout: 5000
})

const chartLogData = (phy, dev, pla, at, gt) => {
  at = (at === undefined) ? '' : at
  gt = (gt === undefined) ? '' : gt
  return client.get('/users/')
    .then(res1 => {
      return client.get(`logs/?physics=${res1.data.physics[phy]}&\
device=${res1.data.device[dev]}&\
place=${res1.data.place[pla]}&\
created_at=${at}&\
created_gt=${gt}`)
        .then(res2 => {
          let parms = {'place': pla, 'physics': phy}
          res2.data.unshift(parms)
          return Promise.resolve(res2)
        })
    })
}

const chartDataArray = (phy, dev, pla, at, gt) => {
  return chartLogData(phy, dev, pla, at, gt)
    .then(res => {
      // let labelAndData = {'label': null, 'data': null}
      let cdata = []
      let label = `${res.data[0]['place']}の${res.data[0]['physics']}`
      res.data.slice(1).forEach(element => {
        // console.log(`cdata${element['created_at']}`)
        // console.log(`cdata${element['value']}`)
        cdata.push({
          t: new Date(element['created_at']),
          y: element['value']
        })
      })
      // labelAndData.label = label
      // labelAndData.data = cdata
      // console.log(`cdata${cdata[1]['t']}`)
      return Promise.resolve([label, cdata])
    })
}

const getChartDataFormat = (labels, datas) => {
  return {
    datasets: [{
      label: labels,
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(255,0,0,1)',
      data: datas
    }]
  }
}

const getChartOptionFormat = (realtime = false, refresh = 5000, func = null) => {
  if (realtime === false) {
    return {
      scales: {
        xAxes: [{
          type: 'time'
        }]
      },
      plugins: {
        streaming: false
      }
    }
  } else {
    return {
      scales: {
        xAxes: [{
          type: 'realtime',
          realtime: {
            delay: 2000,
            refresh: refresh,
            duration: 300000,
            onRefresh: () => {
              func()
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
    }
  }
}

export {client, chartLogData, getChartDataFormat, getChartOptionFormat, chartDataArray}
