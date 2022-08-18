import React from 'react'
import { MyResponsivePie } from '../components/CategoryPieChart'
import { MyResponsiveRadialBar} from '../components/RadialChart'
import { useUser } from "../lib/hooks"
import { wrapper } from '../redux/store'
import { readTxns } from '../redux/features/txnsSlice'


const Reports = () => {
  const [user] = useUser()
  return (
    <div className="drawer-content flex items-center justify-center py-2 pr-3 md:max-h-screen lg:max-h-screen">
      {/* <div className="card w-96 bg-base-100 border">
        <figure className="px-10 pt-10">
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" className="rounded-xl" />
        </figure>
        <MyResponsivePie />
        <div className="card-body items-center text-center">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>

        </div>
      </div>
      <div className="card w-96 bg-base-100 border">
        <figure className="px-10 pt-10">
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div> */}

      <div className="card w-2/5 h-full bg-base-100 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title">Categories</h2>
          <MyResponsiveRadialBar />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res }) => {
    await store.dispatch(readTxns({ req, res }))
  }
);


export default Reports
