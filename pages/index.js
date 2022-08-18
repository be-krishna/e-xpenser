import Router from 'next/router'
import { useEffect } from 'react'
import InputForm from "../components/InputForm"
import Stats from "../components/Stats"
import Table from "../components/Table"
import MainContainer from "../components/MainContainer"
import { wrapper } from '../redux/store'
import { readTxns } from '../redux/features/txnsSlice'
import { useSelector } from 'react-redux';


export default function HomePage() {
  const { txns } = useSelector((state) => state.txns);

  return (
    <MainContainer>
      {/* top section */}
      <div className="container h-1/5 my-2 flex">
        <Stats txns={txns} />
      </div>
      {/* bottom section */}
      <div className="h-4/5 flex flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-2">
        {/* left / top */}
        <div className="container w-3/5 max-h-full card bg-base-100 shadow-lg">
          <div className="card-body items-center overflow-x-auto scrollbar-hide">
            <h2 className="card-title">Recent Transaction</h2>
            <Table />
          </div>
        </div>
        {/* right / bottom */}
        <InputForm />
        {/* input form */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div>
    </MainContainer>

  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ req, res }) => {
    await store.dispatch(readTxns({ req, res }))
  }
);

