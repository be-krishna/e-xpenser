import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import MainContainer from "../components/MainContainer"
import Table from '../components/Table'
import { useUser } from '../lib/hooks'
const Expenses = () => {
  const [user] = useUser()


  useEffect(() => {
    if (!user) {
      Router.push('/login')
    }

  }, [user])
  return (
    <MainContainer>
      <div className="container h-full max-h-full card bg-base-100 shadow-lg">
        <div className="card-body items-center overflow-x-auto scrollbar-hide">
          <h2 className="card-title">Recent Transaction</h2>
          <Table/>
        </div>
      </div>
    </MainContainer>
  )
}

export default Expenses
