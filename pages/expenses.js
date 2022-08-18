import Router from 'next/router'
import React, { useEffect } from 'react'
import MainContainer from "../components/MainContainer"
import { MyResponsivePie } from '../components/PieChart'
import Stats from "../components/Stats"
import Table from '../components/Table'
import { useUser } from '../lib/hooks'
import { wrapper } from '../redux/store'
import { readExpns } from '../redux/features/txnsSlice'


import { data } from "../components/PieChart"
const Expenses = () => {
  const [user] = useUser()


  useEffect(() => {
    if (!user) {
      Router.push('/login')
    }

  }, [user])
  return (
    <MainContainer>
      <div className="container h-1/5 my-2 flex">
        <Stats />
      </div>
      {/* bottom section */}
      <div className="container h-4/5 flex flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-2">
        {/* left / top */}
        <div className="container w-3/5 max-h-full card bg-base-100 shadow-lg">
          <div className="card-body items-center overflow-x-auto scrollbar-hide">
            <h2 className="card-title">Expenses</h2>
            <Table />
          </div>
        </div>
        {/* right / bottom */}
        <div className="card w-2/5 max-h-full bg-base-100 shadow-lg">
          <div className="card-body items-center">
            <h2 className="card-title">Categories</h2>
            <MyResponsivePie data={data} />
          </div>
        </div>
        {/* input form */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div>
    </MainContainer>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res }) => {
    await store.dispatch(readExpns({ req, res }))
  }
);


export default Expenses
