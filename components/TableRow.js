import React, { useState } from 'react'
import { BookOpenIcon, CakeIcon, MusicNoteIcon, PencilIcon, QuestionMarkCircleIcon, TagIcon, TrashIcon, TruckIcon } from "@heroicons/react/outline"
import { CashIcon, HomeIcon, CurrencyRupeeIcon, TrendingUpIcon } from "@heroicons/react/solid"
import TransactionDetail from './TransactionDetail'
import moment from 'moment'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { deleteTxn } from "../redux/features/txnSlice"
import { readTxns } from "../redux/features/txnsSlice"

const TableRow = ({ txn }) => {
  const [deleted, setDeleted] = useState(false)

  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteTxn(id)).then(() => {
      dispatch(readTxns())
      setDeleted(true)
    })

    setTimeout(() => {
      setDeleted(false)
    }, 2000);
  }


  const expCatIcon = (cat) => {
    switch (cat) {
    case "food_drink":
      return <CakeIcon className='text-food' />
    case "entertainment":
      return <MusicNoteIcon className='text-ent' />
    case "transport":
      return <TruckIcon className='text-trans' />
    case "education":
      return <BookOpenIcon className='text-edu' />
    case "misc":
      return <TagIcon className='text-misc' />
    default:
      return <QuestionMarkCircleIcon />
    }
  }

  const revCatIcon = (cat) => {
    switch (cat) {
    case "salary":
      return <CashIcon className='text-sal' />
    case "rent":
      return <HomeIcon className='text-rent' />
    case "interest":
      return <CurrencyRupeeIcon className='text-int' />
    case "funds":
      return <TrendingUpIcon className='text-funds' />
    case "misc":
      return <TagIcon className='text-misc' />
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
              {txn.type === "expense" ? expCatIcon(txn.category) : revCatIcon(txn.category)}
            </div>
            <div>
              <div className="font-bold">{txn.title}</div>
              <span className="badge badge-success badge-sm">{txn.category}</span>
            </div>
          </div>
        </td>
        <td>
          ₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(txn.amount)}
        </td>
        <td>{moment(txn.date).format("MMM Do YY")}</td>
        <td>
          <div className="flex items-center space-x-2">
            {/* TODO: Fix the view transactions problem */}
            <TransactionDetail key={txn._id} txn={txn} />
            <Link href={`/update/${txn._id}`}>
              <a href="">
                <PencilIcon className='w-6' />
              </a>
            </Link>
            <label htmlFor="my-modal-4" className="modal-button">
              <TrashIcon className='w-6 text-error cursor-pointer' onClick={() => handleDelete(txn._id)} />
            </label>
          </div>
        </td>
      </tr>
      {deleted && <div className="toast toast-top toast-end">
        <div className="alert alert-success">
          <div>
            <span>Added Successfully!</span>
          </div>
        </div>
      </div>}
    </>
  )
}

export default TableRow
