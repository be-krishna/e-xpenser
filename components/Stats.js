import { AdjustmentsIcon, CashIcon, InformationCircleIcon, TrendingDownIcon, TrendingUpIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const totalExp = (txns) => {
  txns = txns.filter(i => i.type === "expense")
  let total = 0
  txns.forEach(i => total += i.amount)
  return total
}

const totalRev = (txns) => {
  txns = txns.filter(i => i.type === "income")
  let total = 0
  txns.forEach(i => total += i.amount)
  return total
}
const Stats = () => {
  const { txns, loading, success } = useSelector((state) => state.txns);

  const [stats, setStats] = useState({
    expense: 0,
    revenue: 0
  })

  useEffect(() => {
    setStats({ expense: totalExp(txns), revenue: totalRev(txns) })

    return () => {
    }
  }, [loading, txns])




  return (
    <div className="stats shadow w-full">

      <div className="stat">
        <div className="stat-figure text-success">
          <TrendingUpIcon className='w-10' />
        </div>
        <div className="stat-title">Expense</div>
        <div className="stat-value">
          ₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(stats.expense)}
        </div>
        {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <TrendingDownIcon className='w-10' />
        </div>
        <div className="stat-title">Revenue</div>
        <div className="stat-value">
          ₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(stats.revenue)}
        </div>
        {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
      </div>

      <div className="stat">
        <div className="stat-figure text-base-content">
          <CashIcon className='w-10' />
        </div>
        <div className="stat-title">Total</div>
        <div className="stat-value">
          ₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(stats.revenue - stats.expense)}
        </div>
        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
      </div>

    </div>
  )
}

export default Stats
