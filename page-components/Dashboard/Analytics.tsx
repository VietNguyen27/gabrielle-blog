import React, { useState } from 'react'
import clsx from 'clsx'
import { Button } from '@components/Button'
import { useLocalUser } from '@hooks/index'
import { usePostsByUserId } from '@lib/post'
import { useCommentsByUserId } from '@lib/comment'
import { useFollowersByUserId } from '@lib/followers'
import { useLikesByUserId } from '@lib/like'
import { useBookmarksByUserId } from '@lib/bookmark'
import {
  getDateISO,
  getDaysInMonth,
  getDaysInWeek,
  getMonthsInYear,
  isSameDay,
  isSameMonth,
} from '@utils/utils'

import PostsChart from './PostsChart'
import ReactionsChart from './ReactionsChart'
import FollowersChart from './FollowersChart'
import CommentsChart from './CommentsChart'

const tabs = ['Week', 'Month', 'Year']
const charts = [PostsChart, ReactionsChart, FollowersChart, CommentsChart]

const Analytics = () => {
  const daysInWeek = getDaysInWeek().map((day) => getDateISO(day))
  const daysInMonth = getDaysInMonth().map((day) => getDateISO(day))
  const monthsInYear = getMonthsInYear().map((day) =>
    getDateISO(day)?.slice(0, 7)
  )
  const [timeline, setTimeline] = useState(daysInWeek)
  const [currentTab, setCurrentTab] = useState(0)
  const localUser = useLocalUser()

  const { data: { comments } = {} } = useCommentsByUserId(
    localUser._id,
    timeline[0] as string
  )
  const { data: { followers } = {} } = useFollowersByUserId(
    localUser._id,
    timeline[0] as string
  )
  const { data: { posts } = {} } = usePostsByUserId(
    localUser._id,
    timeline[0] as string
  )
  const { data: { likes } = {} } = useLikesByUserId(
    localUser._id,
    timeline[0] as string
  )
  const { data: { bookmarks } = {} } = useBookmarksByUserId(
    localUser._id,
    timeline[0] as string
  )

  const [options, setOptions] = useState<any>({
    chart: {
      width: '100%',
      fontFamily: 'Quicksand, sans-serif',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
      borderColor: '#d8dadd80',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'top',
      fontSize: '14px',
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 'semibold',
      offsetY: -10,
      markers: {
        width: 35,
        height: 15,
        radius: 0,
        offsetX: -2,
        offsetY: 1,
      },
    },
    markers: {
      size: 4,
      hover: {
        sizeOffset: 2,
      },
    },
    stroke: {
      curve: 'straight',
      width: 3,
    },
    title: {
      align: 'center',
      style: {
        fontSize: '22px',
      },
    },
    xaxis: {
      categories: timeline,
      tickAmount: 15,
      labels: {
        style: {
          fontSize: '11px',
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val && val.toFixed(0)
        },
      },
    },
  })

  const setChart = (timeline) => {
    setTimeline(timeline)
    setOptions({
      ...options,
      xaxis: {
        ...options.xaxis,
        categories: timeline,
      },
    })
  }

  const setChartInWeek = () => setChart(daysInWeek)
  const setChartInMonth = () => setChart(daysInMonth)
  const setChartInInfinity = () => setChart(monthsInYear)

  const chartHandler = {
    0: setChartInWeek,
    1: setChartInMonth,
    2: setChartInInfinity,
  }

  const handleChangeTab = (index) => {
    chartHandler[index]()
    setCurrentTab(index)
  }

  return (
    <div className="relative flex min-h-[25vh] flex-1 flex-col items-stretch rounded-md border border-gray-200 p-4 shadow xs:min-h-[50vh]">
      <div className="absolute bottom-full left-0 flex w-full items-center justify-center pb-2">
        <ul className="flex items-center">
          {tabs.map((tab, index) => (
            <li className="mx-1" key={index}>
              <Button
                data-text={tab}
                variant="quaternary"
                className={clsx(
                  'flex-col px-2 py-1.5 after:-mb-1 after:h-0 after:select-none after:overflow-hidden after:font-bold after:content-[attr(data-text)]',
                  currentTab === index ? 'font-bold' : 'text-gray-500'
                )}
                onClick={() => handleChangeTab(index)}
              >
                {tab}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="-mx-2 -mb-4 flex flex-wrap items-stretch xs:-mb-0 xs:pb-4">
        <div className="w-1/2 px-2 pb-4 lg:w-1/4">
          <div className="flex h-full flex-col items-center justify-between rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-center shadow">
            <p className="pb-2 font-bold">
              Posts {tabs[currentTab] && `this ${tabs[currentTab]}`}
            </p>
            {posts ? (
              <span className="text-3xl font-semibold">{posts.length}</span>
            ) : (
              <span className="mt-1 inline-block h-8 w-6 animate-pulse rounded bg-gray-200"></span>
            )}
          </div>
        </div>
        <div className="w-1/2 px-2 pb-4 lg:w-1/4">
          <div className="flex h-full flex-col items-center justify-between rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-center shadow">
            <p className="pb-2 font-bold">
              Reactions {`this ${tabs[currentTab]}`}
            </p>
            <span className="text-3xl font-semibold">
              {likes && bookmarks ? (
                <span className="text-3xl font-semibold">
                  {likes.length + bookmarks.length}
                </span>
              ) : (
                <span className="mt-1 inline-block h-8 w-6 animate-pulse rounded bg-gray-200"></span>
              )}
            </span>
          </div>
        </div>
        <div className="w-1/2 px-2 pb-4 lg:w-1/4">
          <div className="flex h-full flex-col items-center justify-between rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-center shadow">
            <p className="pb-2 font-bold">
              Comments {`this ${tabs[currentTab]}`}
            </p>
            <span className="text-3xl font-semibold">
              {comments ? (
                <span className="text-3xl font-semibold">
                  {comments.length}
                </span>
              ) : (
                <span className="mt-1 inline-block h-8 w-6 animate-pulse rounded bg-gray-200"></span>
              )}
            </span>
          </div>
        </div>
        <div className="w-1/2 px-2 pb-4 lg:w-1/4">
          <div className="flex h-full flex-col items-center justify-between rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-center shadow">
            <p className="pb-2 font-bold">
              Followers {`this ${tabs[currentTab]}`}
            </p>
            <span className="text-3xl font-semibold">
              {followers ? (
                <span className="text-3xl font-semibold">
                  {followers.length}
                </span>
              ) : (
                <span className="mt-1 inline-block h-8 w-6 animate-pulse rounded bg-gray-200"></span>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="-mx-2 hidden flex-wrap items-stretch xs:flex">
        {charts.map((Chart, index) => (
          <div key={index} className="mt-4 w-full px-2 xl:w-1/2">
            <div className="rounded-md border border-gray-200 bg-gray-50 px-2 pt-3 pb-8 shadow">
              <Chart
                options={options}
                posts={posts}
                likes={likes}
                bookmarks={bookmarks}
                followers={followers}
                comments={comments}
                timeline={timeline}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getDateCounts = (data, timeline, byMonth = false) => {
  return data.reduce((acc, curr) => {
    const date = timeline.find((date) => {
      if (byMonth) {
        return isSameMonth(new Date(date), new Date(curr.createdAt))
      }

      return isSameDay(new Date(date), new Date(curr.createdAt))
    })

    return (acc[date] = (acc[date] || 0) + 1), acc
  }, {})
}

export const getNewSeries = (timeline) => {
  return timeline.reduce((acc, curr) => {
    return (acc[curr] = 0), acc
  }, {})
}

export default Analytics
