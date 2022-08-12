import React, { useState } from 'react'
import { CakeIcon, MusicNoteIcon, PencilIcon, QuestionMarkCircleIcon, TagIcon, TrashIcon, TruckIcon } from "@heroicons/react/outline"
import TransactionDetail from './TransactionDetail'
import moment from 'moment'
import Link from 'next/link'

const TableRow = ({ deleteTxn, ...props }) => {
  const [deleted, setDeleted] = useState(false)
  const handleDelete = () => {
    const deleted = deleteTxn(props._id)

    if (deleted) {
      setDeleted(true)
      setTimeout(() => {
        setDeleted(false)
      }, 2000)
    }
  }

  const categoryIcon = (cat) => {

    switch (cat) {
      case "food_drink":
        return <CakeIcon />
      case "entertainment":
        return <MusicNoteIcon />
      case "transport":
        return <TruckIcon />
      case "misc":
        return <TagIcon />
      default:
        return <QuestionMarkCircleIcon />
    }
  }

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-6">
            <div className='w-8 text-success'>
              {categoryIcon(props.category)}
            </div>
            <div>
              <div className="font-bold">{props.title}</div>
              <span className="badge badge-success badge-sm">{props.category}</span>
            </div>
          </div>
        </td>
        <td>
          ₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(props.amount)}
        </td>
        <td>{moment(props.date).format("MMM Do YY")}</td>
        <td>
          <div className="flex items-center space-x-2">
            <TransactionDetail {...props} />
            <Link href={`/${props._id}/edit`}>
              <a href="">
                <PencilIcon className='w-6' />
              </a>
            </Link>
            <TrashIcon className='w-6 text-error cursor-pointer' onClick={handleDelete} />
            {deleted
              ? <div className="alert alet-success">
                <div>
                  <span>Deleted</span>
                </div>
              </div>
              : ''}
          </div>
        </td>
      </tr>
    </>
  )
}

export default TableRow
