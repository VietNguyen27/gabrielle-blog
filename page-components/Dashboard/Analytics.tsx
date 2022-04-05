import { Button } from '@components/Button'
import clsx from 'clsx'
import React, { useState } from 'react'
import PostsChart from './PostsChart'
import FollowersChart from './FollowersChart'
import ReactionsChart from './ReactionsChart'
import CommentsChart from './CommentsChart'
import { getDateISO, getDaysInWeek } from '@utils/utils'

const tabs = ['Week', 'Month', 'Infinity']
const charts = [PostsChart, FollowersChart, ReactionsChart, CommentsChart]

const Analytics = () => {
  const daysInWeeks = getDaysInWeek(new Date()).map((day) => getDateISO(day))
  const [currentTab, setCurrentTab] = useState(0)
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
      categories: daysInWeeks,
      labels: {
        style: {
          fontSize: '11px',
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 536,
        options: {
          yaxis: {
            tickAmount: 2,
            labels: {
              formatter: function (val) {
                return val.toFixed(0)
              },
            },
          },
        },
      },
    ],
  })

  return (
    <div className="relative flex flex-1 flex-col items-stretch rounded-md border border-gray-200 p-4 shadow xs:min-h-[50vh]">
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
                onClick={() => setCurrentTab(index)}
              >
                {tab}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="-mx-2 -mb-4 flex flex-wrap items-stretch xs:-mb-0 xs:pb-4">
        <div className="w-1/2 px-2 pb-4 lg:w-1/4">
          <div className="flex h-full flex-col items-center rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-center shadow">
            <p className="pb-2 font-bold">
              Posts{' '}
              {tabs[currentTab] !== 'Infinity' && `this ${tabs[currentTab]}`}
            </p>
            <span className="text-3xl font-semibold">0</span>
          </div>
        </div>
        <div className="w-1/2 px-2 pb-4 lg:w-1/4">
          <div className="flex h-full flex-col items-center rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-center shadow">
            <p className="pb-2 font-bold">
              Reactions{' '}
              {tabs[currentTab] !== 'Infinity' && `this ${tabs[currentTab]}`}
            </p>
            <span className="text-3xl font-semibold">0</span>
          </div>
        </div>
        <div className="w-1/2 px-2 pb-4 lg:w-1/4">
          <div className="flex h-full flex-col items-center rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-center shadow">
            <p className="pb-2 font-bold">
              Comments{' '}
              {tabs[currentTab] !== 'Infinity' && `this ${tabs[currentTab]}`}
            </p>
            <span className="text-3xl font-semibold">0</span>
          </div>
        </div>
        <div className="w-1/2 px-2 pb-4 lg:w-1/4">
          <div className="flex h-full flex-col items-center rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-center shadow">
            <p className="pb-2 font-bold">
              Followers{' '}
              {tabs[currentTab] !== 'Infinity' && `this ${tabs[currentTab]}`}
            </p>
            <span className="text-3xl font-semibold">0</span>
          </div>
        </div>
      </div>
      <div className="-mx-2 hidden flex-wrap items-stretch xs:flex">
        {charts.map((Chart, index) => (
          <div key={index} className="mt-4 w-full px-2 xl:w-1/2">
            <div className="rounded-md border border-gray-200 bg-gray-50 px-2 pt-3 pb-8 shadow">
              <Chart options={options} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics
