import { readTxn } from '../../redux/features/txnSlice'
import { wrapper } from '../../redux/store'

import TxnDetails from '../../components/TxnDetails'


export default function TaskId() {
  return (
    <div>
      <h3>Details</h3>
      <TxnDetails />
    </div>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ params, req }) => {
    const id = params.id
    await store.dispatch(readTxn({ id, req }));
  }
);
