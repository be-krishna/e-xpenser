import React, { useEffect, useState } from 'react'
import TableRow from './TableRow'

const DeleteAlert = ({title, id, handleClick}) => {
  return (<div className="modal" id="my-modal-2">
    <div className="modal-box">
      <h3 className="font-bold text-lg">{title}</h3>
      <div className="modal-action">
        <a href="#" className='btn btn-sm btn-ghost' >No</a>
        <a href="#" className='btn btn-sm' onClick={()=>handleClick(id)}>Yes</a>
      </div>
    </div>
  </div>)
}

const Table = ({ transactions }) => {

  const [txnItems, setTxnItems] = useState([...transactions])


  const deleteTxn = async (id) => {
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" })

    if (res.status === 200) {
      setTxnItems(txnItems.filter((t) => t._id !== id))
      return true
    }

    return false
  }


  return (
    <div>
      <table className="table w-full">
        <tbody>
          {txnItems.map((txn) => { return <TableRow key={txn._id} {...txn} deleteTxn={deleteTxn} /> })}
        </tbody>
      </table>
      {/* <DeleteAlert/> */}
    </div>
  )
}

export default Table

