import React from 'react'
import { MyResponsivePie } from '../components/CategoryPieChart'
import { MyResponsiveRadialBar } from '../components/RadialChart'
import { useUser } from "../lib/hooks"
import { wrapper } from '../redux/store'
import { readTxns } from '../redux/features/txnsSlice'


const Reports = () => {
  const [user] = useUser()
  return (
    <div className="drawer-content flex space-y-4 flex-col items-center justify-start py-2 pr-3 md:max-h-screen lg:max-h-screen">
      <div><h1 className="text-3xl font-bold">Report for: {user.name}</h1></div>
      <div className='flex container h-1/2'>
        <div className='basis-1/2 flex flex-col items-center justify-center'>
          <div className='card-title'>Expenses</div>
          <MyResponsiveRadialBar />
        </div>
        <div className='basis-1/2 flex flex-col items-center justify-center'>
          <div className='card-title'>Revenues</div>
          <MyResponsiveRadialBar />
        </div>
      </div>
      <div>Report Data</div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res }) => {
    await store.dispatch(readTxns({ req, res }))
  }
);


export default Reports
