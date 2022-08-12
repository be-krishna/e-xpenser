import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { readTxns } from "../redux/features/txnsSlice";
import { updateTxn } from "../redux/features/txnSlice";

import moment from "moment";

const categories = [
  { id: "fnd", value: "food_drink", name: "Food & Drinks" },
  { id: "ent", value: "entertainment", name: "Entertainment" },
  { id: "tran", value: "transport", name: "Transport" },
  { id: "misc", value: "misc", name: "Miscellaneous" },
]
const max_date = moment().format('YYYY-MM-DD');

export default function TxnUpdate() {
  const [txnDetail, setTxnDetail] = useState({
    title: "",
    desription: "",
    type: "",
    amount: "",
    category: "",
    date: "",

  })
  const [selectedOption, setSelectedOption] = useState("");
  const [added, setAdded] = useState(false)


  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { txn, loading, success, message } = useSelector(
    (state) => state.txn
  );

  const handleOptions = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleChange = (e) => {
    setTxnDetail({ ...txnDetail, title: e.target.value })
  }

  useEffect(() => {
    if (txn && txn._id !== id) {
      dispatch(readTxns());
    } else {
      setTxnDetail(txn)
    }
  }, [id, txn, dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateTxn({ id, data: txnDetail })).then((result) => {
      if (!result.error) {
        setAdded(true)
        setTimeout(() => {
          router.push("/");
          setAdded(false)
        }, 800);
      } else {
        console.log(result);
      }
    });
  };


  return (
    <>
      <div className="card w-2/5 max-h-full bg-base-100 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title">Update transaction</h2>
          <form onSubmit={handleSubmit} className="container w-full" >
            <input type="text" name="title" placeholder="Title"
              className="my-2 input input-bordered w-full"
              value={txnDetail.title} onChange={(e) => handleChange(e)} />
            <input type="text" name="amount" placeholder="Amount"
              className="my-2 input input-bordered w-full"
              value={txnDetail.amount} onChange={(e) => setTxnDetail({ ...txnDetail, amount: e.target.value })} />

            <select name="category" onChange={handleOptions} value={txnDetail.category} className='select select-bordered my-2 w-full'>
              <option value="" disabled>Select Category</option>
              {/* <option value="grapefruit">Grapefruit</option>
              <option selected value="coconut">Coconut</option>
              <option value="mango">Mango</option> */}
              {categories.map((cat) => (<option key={cat.id} value={cat.value}>{cat.name}</option>))}
            </select>

            <input type="date" max={max_date} name="date" placeholder="Date"
              className="my-2 input input-bordered w-full"
              value={moment(txnDetail.date).format('YYYY-MM-DD')} onChange={(e) => setTxnDetail({ ...txnDetail, date: e.target.value })} />
            <textarea name="description" className="textarea textarea-bordered my-2 w-full" placeholder="Description"
              value={txnDetail.description} onChange={(e) => setTxnDetail({ ...txnDetail, description: e.target.value })} />
            <button type='submit' className="btn w-full btn-primary my-2">Update</button>
          </form>
          {added && <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <div>
                <span>Updated Successfully!</span>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}
