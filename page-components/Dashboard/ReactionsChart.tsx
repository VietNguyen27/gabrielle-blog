import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { getDateCounts, getNewSeries } from './Analytics'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ReactionsChart = ({ options, likes, bookmarks, timeline }) => {
  const [series, setSeries] = useState([
    {
      name: 'Likes',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Bookmarks',
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ])

  useEffect(() => {
    if (likes && bookmarks) {
      const likesDateCounts = getDateCounts(
        likes,
        timeline,
        timeline.length === 12
      )
      const newLikesSeries = Object.values({
        ...getNewSeries(timeline),
        ...likesDateCounts,
      })
      const bookmarksDateCounts = getDateCounts(
        bookmarks,
        timeline,
        timeline.length === 12
      )
      const newBookmarksSeries = Object.values({
        ...getNewSeries(timeline),
        ...bookmarksDateCounts,
      })

      const [likesSeries, bookmarksSeries] = series

      setSeries([
        {
          ...likesSeries,
          data: newLikesSeries as any,
        },
        {
          ...bookmarksSeries,
          data: newBookmarksSeries as any,
        },
      ])
    }
  }, [likes, bookmarks])

  return (
    <div className="relative h-0 w-full pb-[56.25%]">
      <Chart
        options={{
          ...options,
          colors: ['#b91c1c', '#6366f1'],
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
