import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export default function PositionSupportChart (props) {

  const {positions, colors} = props

  const supports = positions.supports ? positions.supports.length : 0
  const mixed = positions.mixed ? positions.mixed.length : 0
  const opposed = positions.opposed ? positions.opposed.length : 0
  const unknown = positions.unknown ? positions.unknown.length : 0
  
  const totalPositions = supports + mixed + opposed + unknown

  const supportsPercentage = Math.floor((supports * 100) / totalPositions)
  const mixedPercentage = Math.floor((mixed * 100) / totalPositions)
  const opposedPercentage = Math.floor((opposed * 100) / totalPositions)
  const unknownPercentage = Math.floor((unknown * 100) / totalPositions)

  
  const chartData = {
    labels: [`Supports - (${supportsPercentage}%)`, `Mixed - (${mixedPercentage}%)`, `Opposed - (${opposedPercentage}%)`, `Unknown - (${unknownPercentage}%)`],
    datasets: [
      {
        data: [supports, mixed, opposed, unknown],
        backgroundColor: [colors.supports, colors.mixed, colors.opposed, colors.unknown]
      }
    ]
  }

  const chartOptions = {
    legend: {
      display: true,
      position: 'bottom'
    },
    maintainAspectRatio: false
  }

  return (
    <Doughnut options={chartOptions} data={chartData} />
  )
}
