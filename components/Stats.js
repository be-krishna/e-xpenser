import { AdjustmentsIcon, CashIcon, InformationCircleIcon, TrendingDownIcon, TrendingUpIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import moment from 'moment';

const totalExp = (txns) => {
  txns = txns.filter(i => i.type === "expense")
  let total = 0
  txns.forEach(i => total += i.amount)
  return total
}

const totalRev = (txns) => {
  txns = txns.filter(i => i.type === "revenue")
  let total = 0
  txns.forEach(i => total += i.amount)
  return total
}

const totalOfMonth = (txns) => {
  txns = txns.filter(i => moment(i.date).isSame(moment(), 'month'))
  let total = 0
  txns.forEach(i => total += i.amount)
  return total
}

const totalOfWeek = (txns) => {
  txns = txns.filter(i => moment(i.date).isSame(moment(), 'week'))
  let total = 0
  txns.forEach(i => total += i.amount)
  return total
}

const total = (txns) => {
  let total = 0
  txns.forEach(i => total += i.amount)
  return total
}

const Stats = ({ txns }) => {
  const router = useRouter()

  const [stats, setStats] = useState({
    left: { label: 'left', value: 0 },
    mid: { label: 'mid', value: 0 },
    right: { label: 'right', value: 0 }
  })



  useEffect(() => {
    const updateData = (txns) => {
      if (router.pathname === "/") {
        setStats({
          left: { label: 'Expenses', value: totalExp(txns) },
          mid: { label: 'Revenues', value: totalRev(txns) },
          right: { label: 'Total', value: totalRev(txns) - totalExp(txns) }
        })
      }
      if (router.pathname === "/expenses") {
        setStats({
          left: { label: 'Week', value: totalOfWeek(txns) },
          mid: { label: 'Month', value: totalOfMonth(txns) },
          right: { label: 'Total', value: total(txns) }
        })
      }
      if (router.pathname === "/revenues") {
        setStats({
          left: { label: 'Week', value: totalOfWeek(txns) },
          mid: { label: 'Month', value: totalOfMonth(txns) },
          right: { label: 'Total', value: total(txns) }
        })
      }

    }

    updateData(txns)

  }, [txns, router.pathname])




  return (
    <div className="stats shadow w-full">

      <div className="stat">
        <div className="stat-figure text-success">
          <TrendingUpIcon className='w-10' />
        </div>
        <div className="stat-title">{stats.left.label}</div>
        <div className="stat-value">
          ₹ {new Intl.NumberFormat('en-IN').format(stats.left.value)}
        </div>
        {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <TrendingDownIcon className='w-10' />
        </div>
        <div className="stat-title">{stats.mid.label}</div>
        <div className="stat-value">
          ₹ {new Intl.NumberFormat('en-IN').format(stats.mid.value)}
        </div>
        {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
      </div>

      <div className="stat">
        <div className="stat-figure text-base-content">
          <CashIcon className='w-10' />
        </div>
        <div className="stat-title">{stats.right.label}</div>
        <div className="stat-value">
          ₹ {new Intl.NumberFormat('en-IN').format(stats.right.value)}
        </div>
        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
      </div>

    </div>
  )
}

export default Stats
