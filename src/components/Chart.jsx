import React, { memo } from 'react'
import {
  VictoryChart,
  VictoryArea,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory'

import { max, min } from 'd3-array'

const Chart = memo(({ data, height, width }) => {
  if (data.length === 0) {
    return null
  }

  const localData = data.map(el => {
    const time = new Date(el.time * 1000)
    return {
      time: time,
      data: el.data,
      label: `${el.data} \n ${time.toLocaleDateString()}`,
    }
  })

  const maxYValue = max(data, d => d.data) + 10
  const minYValue = min(data, d => d.data) - 10

  return (
    <>
      <svg style={{ height: 0 }}>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="orangered" stopOpacity="1"></stop>
          <stop offset="100%" stopColor="gold" stopOpacity="1"></stop>
        </linearGradient>
      </svg>
      <VictoryChart
        height={height}
        width={width}
        theme={VictoryTheme.material}
        domainPadding={{ x: 0, y: [0, 20] }}
        scale={{ x: 'time', y: 'linear' }}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryArea
          style={{ data: { fill: 'url(#gradient)' } }}
          data={localData}
          // labels={({ datum }) => datum.time}
          labelComponent={<VictoryTooltip />}
          interpolation={'monotoneX'}
          domain={{ y: [minYValue, maxYValue] }}
          x="time"
          y="data"
        />
      </VictoryChart>
    </>
  )
})

export { Chart }
