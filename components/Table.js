import TableRow from './TableRow'
import { useSelector } from 'react-redux';



const Table = () => {
  const { txns } = useSelector((state) => state.txns);

  return (
    <div className="container">
      <table className="table w-full">
        <tbody>
          {
            txns && txns.length !== 0 ? (
              txns.map((tx) => (
                <TableRow
                  key={tx._id}
                  txn={tx}
                />
              ))
            ) : (
              <tr><td>No transactions!</td></tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table

