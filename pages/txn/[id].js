import { readTxn } from '../../redux/features/txnSlice'
import { wrapper } from '../../redux/store'

import TransactionDetail from '../../components/TransactionDetail'


export default function TxnId() {
  return (
    <TransactionDetail />
  )
}


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ params, req }) => {
    const id = params.id
    await store.dispatch(readTxn({ id, req }));
  }
);
