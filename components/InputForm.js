import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { createTxn } from '../redux/features/txnSlice';
import { readTxns } from '../redux/features/txnsSlice';
import moment from 'moment';

const categories = [
  { id: "fnd", value: "food_drink", name: "Food & Drinks" },
  { id: "ent", value: "entertainment", name: "Entertainment" },
  { id: "tran", value: "transport", name: "Transport" },
  { id: "misc", value: "misc", name: "Miscellaneous" },
]

const max_date = moment().format('YYYY-MM-DD');

const InputForm = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.txn);

  const [added, setAdded] = useState(false)

  const [selectedOption, setSelectedOption] = useState("");
  const [expense, setExpense] = useState(true)

  const handleOptions = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      title: e.currentTarget.title.value,
      amount: e.currentTarget.amount.value,
      category: expense ? e.currentTarget.category.value : "income",
      date: e.currentTarget.date.value,
      description: e.currentTarget.description.value,
      type: expense ? "expense" : "income"
    }

    console.log(body);

    await dispatch(createTxn(body)).then(() => {
      dispatch(readTxns());
      setAdded(true)
    });

    setTimeout(() => {
      setAdded(false)
    }, 2000);

    e.target.reset()
  }

  return (
    <>
      <div className="card w-2/5 max-h-full bg-base-100 shadow-lg">
        <div className="card-body items-center">
          <h2 className="card-title">Add transaction</h2>
          <div className="container tabs tabs-boxed">
            <button className={`tab w-1/2 + ${expense && 'tab-active'}`} onClick={() => setExpense(true)}>Expense</button>
            <button className={`tab w-1/2 + ${!expense && 'tab-active'}`} onClick={() => setExpense(false)}>Revenue</button>
          </div>
          <form onSubmit={handleSubmit} className="container w-full">
            <input type="text" name="title" placeholder="Title" className="my-2 input input-bordered w-full" />
            <input type="text" name="amount" placeholder="Amount" className="my-2 input input-bordered w-full" />

            <select name="category" onChange={handleOptions} value={selectedOption} className='select select-bordered my-2 w-full' disabled={!expense}>
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (<option key={cat.id} value={cat.value}>{cat.name}</option>))}
            </select>

            <input type="date" max={max_date} name="date" placeholder="Date" className="my-2 input input-bordered w-full" />
            <textarea name="description" className="textarea textarea-bordered my-2 w-full" placeholder="Description"></textarea>
            <button type='submit' disabled={loading} className="btn w-full btn-primary my-2">Add</button>
          </form>
          {added && <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <div>
                <span>Added Successfully!</span>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default InputForm
