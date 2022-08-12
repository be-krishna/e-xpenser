import { AdjustmentsIcon, CashIcon, InformationCircleIcon, TrendingDownIcon, TrendingUpIcon } from '@heroicons/react/outline'
import React from 'react'

const Stats = ({ expense, revenue }) => {
  return (
    <div className="stats shadow w-full">

      <div className="stat">
        <div className="stat-figure text-success">
          <TrendingUpIcon className='w-10' />
        </div>
        <div className="stat-title">Expense</div>
        <div className="stat-value">
          ₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(expense)}
        </div>
        {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <TrendingDownIcon className='w-10' />
        </div>
        <div className="stat-title">Revenue</div>
        <div className="stat-value">
          ₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(revenue)}
        </div>
        {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
      </div>

      <div className="stat">
        <div className="stat-figure text-base-content">
          <CashIcon className='w-10' />
        </div>
        <div className="stat-title">Total</div>
        <div className="stat-value">
          ₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(expense + revenue)}
        </div>
        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
      </div>

    </div>
  )
}

export default Stats
