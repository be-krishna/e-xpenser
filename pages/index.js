import Router from 'next/router'
import { useEffect, useState } from 'react'
import InputForm from "../components/InputForm"
import Stats from "../components/Stats"
import Table from "../components/Table"
import { useUser } from '../lib/hooks'


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

export default function HomePage() {
  const [user] = useUser()
  const [transactions, setTransactions] = useState([])

  const getTxns = async () => {
    const resp = await fetch('/api/transactions')
    const result = await resp.json()
    setTransactions(result.data)
  }

  useEffect(() => {
    if (!user) {
      Router.push('/login')
    }

    getTxns()

    return () => { }
  }, [user])

  const updateTxn = (txn) => {
    console.log('update called!');
    console.log(txn);
    setTransactions([...transactions, txn])
  }



  return (
    <div className="drawer-content flex flex-col items-center justify-center p-2 md:max-h-screen lg:max-h-screen">
      {/* top section */}
      <div className="container h-1/5 my-2 flex">
        <Stats expense={totalExp(transactions)} revenue={totalRev(transactions)} />
      </div>
      {/* bottom section */}
      <div className="h-4/5 flex flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-2">
        {/* left / top */}
        <div className="container w-3/5 max-h-full card bg-base-100 shadow-lg">
          <div className="card-body items-center overflow-x-auto scrollbar-hide">
            <h2 className="card-title">Recent Transaction</h2>
            {transactions.length ? <Table transactions={transactions} /> : <h3>Add transaction to get started</h3>}
          </div>
        </div>
        {/* right / bottom */}
        <InputForm updateTxn={updateTxn} />
        {/* input form */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div>
    </div>

  )
}
