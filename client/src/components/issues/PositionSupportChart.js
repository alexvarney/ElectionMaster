import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export default function PositionSupportChart (props) {
  const supports = props.positions.supports ? props.positions.supports.length : 0
  const mixed = props.positions.mixed ? props.positions.mixed.length : 0
  const opposed = props.positions.opposed ? props.positions.opposed.length : 0
  const unknown = props.positions.unknown ? props.positions.unknown.length : 0
  
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
        backgroundColor: ['#B1DE9C', '#F5DF9F', '#EBA598', '#B9B5C7']
      }
    ]
  }

  const chartOptions = {
    legend: {
      display: true,
      position: 'bottom'
    }
  }

  return (
    <Doughnut options={chartOptions} data={chartData} />
  )
}
