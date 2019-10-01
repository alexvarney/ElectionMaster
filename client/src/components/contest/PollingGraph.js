import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { getSubtleColor, getCandidateById } from '../_helpers'

const PollingGraph = (props) => {
  const { contest, candidates } = props

  const [chartData, setChartData] = useState(null)

  const makeChart = () => {
    const candidatePolling = contest.polling.reduce((acc, current) => {
      /*

        This function generates a dataset for each candidate id in pairs of {x: time, y: polling}

        current = {
          date,
          values: [{
            candidate,
            value
          }]
        }
      */

      const date = current.date

      const accReturn = { ...acc }

      current.values.forEach(item => {
        const candidateId = item.candidate
        if (!accReturn[`${candidateId}`]) {
          accReturn[`${candidateId}`] = []
        }

        accReturn[`${candidateId}`].push({
          t: date,
          y: item.value
        })
      })

      return accReturn
    }, {})

    const datasets = []

    for (const [key, value] of Object.entries(candidatePolling)) {
      const candidate = getCandidateById(key, candidates)
      if (candidate && candidate.status && ['active', 'declared'].includes(candidate.status.toLowerCase().trim())) {
        datasets.push({
          label: candidate.name,
          data: value,
          borderColor: getSubtleColor(),
          backgroundColor: 'rgba(0,0,0,0)'
        })
      }
    }

    return ({ datasets })
  }

  useEffect(() => {
    setChartData(makeChart())
  }, [props.candidates, contest])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        }
      }]
    }
  }

  if (!chartData) {
    return <></>
  }

  return (
    <Line options={options} data={chartData} />
  )
}

const mapStateToProps = (state) => ({
  candidates: state.candidates.candidates
})

export default connect(mapStateToProps, {})(PollingGraph)
