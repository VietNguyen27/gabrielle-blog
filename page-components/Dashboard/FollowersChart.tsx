import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const FollowersChart = ({ options }) => {
  const [series, setSeries] = useState([
    {
      name: 'Followers',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ])

  return (
    <div className="relative h-0 w-full pb-[56.25%]">
      <Chart
        options={{
          ...options,
          colors: ['#0063ff'],
          title: { text: 'New Followers Summary', ...options.title },
        }}
        series={series}
        type="line"
        className="absolute top-0 left-0 h-full w-full"
      />
    </div>
  )
}

export default FollowersChart
