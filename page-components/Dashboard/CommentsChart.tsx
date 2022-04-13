import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { getDateCounts, getNewSeries } from './Analytics'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const CommentsChart = ({ options, comments, timeline }) => {
  const [series, setSeries] = useState([
    {
      name: 'Comments',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ])

  useEffect(() => {
    if (comments) {
      const dateCounts = getDateCounts(
        comments,
        timeline,
        timeline.length === 12
      )
      const newSeries = Object.values({
        ...getNewSeries(timeline),
        ...dateCounts,
      })

      setSeries([
        {
          ...series[0],
          data: newSeries as any,
        },
      ])
    }
  }, [comments])

  return (
    <div className="relative h-0 w-full pb-[56.25%]">
      <Chart
        options={{
          ...options,
          colors: ['#16a34a'],
          title: { text: 'Comments Summary', ...options.title },
        }}
        series={series}
        type="line"
        className="absolute top-0 left-0 h-full w-full"
      />
    </div>
  )
}

export default CommentsChart
