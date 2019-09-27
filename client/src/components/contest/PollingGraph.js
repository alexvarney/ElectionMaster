import React from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { getSubtleColor } from '../_helpers'

const PollingGraph = (props) => {
  const { contest } = props

  const getCandidateById = id => {
    const result = props.candidate ? props.candidates.filter(item => item._id === id)[0] : null
    return result || 'Unknown Candidate'
  }

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
      const candidate = item.candidate

      if (!accReturn[`${candidate}`]) {
        accReturn[`${candidate}`] = []
      }

      accReturn[`${candidate}`].push({
        t: date,
        y: item.value
      })
    })

    return accReturn
  }, {})

  const datasets = []

  for (const [key, value] of Object.entries(candidatePolling)) {
    const candidate = getCandidateById(key)

    datasets.push({
      label: candidate.name,
      data: value,
      borderColor: getSubtleColor(),
      backgroundColor: 'rgba(0,0,0,0)'
    })
  }

  const dataObj = {
    datasets
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        }
      }]
    }
  }

  console.log(datasets)

  return (
    <div style={{ height: '500px', maxWidth: '70vw' }}>
      <Line options={options} data={dataObj} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  candidates: state.candidates.candidates
})

export default connect(mapStateToProps, {})(PollingGraph)
