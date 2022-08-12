import { CalendarIcon, EyeIcon } from '@heroicons/react/outline'
import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux';

const TransactionDetail = ({txn}) => {
  // const { txn } = useSelector(
  //   (state) => state.txn
  // );

  return (
    <div>
      <label htmlFor="my-modal-6" className="modal-button">
        <EyeIcon className='w-6 text-primary' />
      </label>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col gap-y-5">
          <div className='flex justify-between'>
            <div>
              <h1 className='text-3xl mb-4 overflow-ellipsis'>{txn.title}</h1>
              <div className='badge badge-success font-normal'>{txn.category}</div>
            </div>
            <h1 className='text-5xl'>₹ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(txn.amount)}</h1>
          </div>
          <div className="flex gap-x-2">
            <CalendarIcon className='w-6 text-success' />
            <div className='font-normal'>{moment(txn.date).format("MMM Do YY")}</div>
          </div>
          <div
            className='font-normal whitespace-normal overflow-x-visible break-words max-w-md'>
            {txn.description}
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">Yay!</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail
