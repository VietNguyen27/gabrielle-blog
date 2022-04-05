import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const CommentsChart = ({ options }) => {
  const [series, setSeries] = useState([
    {
      name: 'Comments',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ])

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
