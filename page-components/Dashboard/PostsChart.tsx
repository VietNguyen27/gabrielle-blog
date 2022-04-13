import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { getDateCounts, getNewSeries } from './Analytics'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const PostsChart = ({ options, posts, timeline }) => {
  const [series, setSeries] = useState([
    {
      name: 'Posts',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ])

  useEffect(() => {
    if (posts) {
      const dateCounts = getDateCounts(posts, timeline, timeline.length === 12)
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
  }, [posts])

  return (
    <div className="relative h-0 w-full pb-[56.25%]">
      <Chart
        options={{
          ...options,
          colors: ['#ff7a52'],
          title: { text: 'Posts Summary', ...options.title },
        }}
        series={series}
        type="line"
        className="absolute top-0 left-0 h-full w-full"
      />
    </div>
  )
}

export default PostsChart
