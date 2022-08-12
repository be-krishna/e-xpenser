import { readTxn } from '../../redux/features/txnSlice'
import { wrapper } from '../../redux/store'

import TxnUpdate from '../../components/TxnUpdate';
import MainContainer from '../../components/MainContainer'


export default function UpdateTxnId() {
  return (

    <MainContainer>
      <TxnUpdate />
    </MainContainer>

  )
}


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ params, req }) => {
    const id = params.id
    await store.dispatch(readTxn({ id, req }));
  }
);
