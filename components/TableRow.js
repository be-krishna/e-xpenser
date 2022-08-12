import React, { useState } from 'react'
import { CakeIcon, MusicNoteIcon, PencilIcon, QuestionMarkCircleIcon, TagIcon, TrashIcon, TruckIcon } from "@heroicons/react/outline"
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
              {categoryIcon(txn.category)}
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
              <TrashIcon className='w-6 text-error cursor-pointer' onClick={()=> handleDelete(txn._id)} />
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
