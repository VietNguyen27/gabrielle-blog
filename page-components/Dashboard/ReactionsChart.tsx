import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ReactionsChart = ({ options }) => {
  const [series, setSeries] = useState([
    {
      name: 'All',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Likes',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Bookmarks',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ])

  return (
    <div className="relative h-0 w-full pb-[56.25%]">
      <Chart
        options={{
          ...options,
          colors: ['#4bc0c0', '#b91c1c', '#6366f1'],
          title: { text: 'Reactions Summary', ...options.title },
        }}
        series={series}
        type="line"
        className="absolute top-0 left-0 h-full w-full"
      />
    </div>
  )
}

export default ReactionsChart
