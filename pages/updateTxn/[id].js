import { readTxn } from '../../redux/features/txnSlice'
import { wrapper } from '../../redux/store'

import TxnUpdate from '../../components/TxnUpdate';


export default function UpdateTxnId() {
  return (
    <div>
      <h3>Update</h3>
      <TxnUpdate />
    </div>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ params, req }) => {
    const id = params.id
    await store.dispatch(readTxn({ id, req }));
  }
);
