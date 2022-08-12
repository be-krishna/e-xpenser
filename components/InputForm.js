import React, { useState } from 'react'
import moment from 'moment';

const categories = [
  { id: "fnd", value: "food_drink", name: "Food & Drinks" },
  { id: "ent", value: "entertainment", name: "Entertainment" },
  { id: "tran", value: "transport", name: "Transport" },
  { id: "misc", value: "misc", name: "Miscellaneous" },
]

const max_date = moment().format('YYYY-MM-DD');

const InputForm = ({ updateTxn }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [expense, setExpense] = useState(true)
  const [errorMsg, setErrorMsg] = useState({})

  const handleOptions = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    const body = {
      title: e.currentTarget.title.value,
      amount: e.currentTarget.amount.value,
      category: e.currentTarget.category.value,
      date: e.currentTarget.date.value,
      description: e.currentTarget.description.value,
      type: expense ? "expense" : "income"
    }

    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.status === 201) {
      const txn = await res.json()
      updateTxn(txn.data)
      setErrorMsg({ ...errorMsg, type: "success", msg: "Added successfully" })
      console.log(errorMsg);
      setTimeout(() => {
        setErrorMsg('')
      }, 2000)
      e.target.reset()
    } else {
      setErrorMsg({ ...errorMsg, type: "error", msg: 'Failed to add' })
      setTimeout(() => {
        setErrorMsg('')
      }, 2000);
    }
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
              {/* <option value="grapefruit">Grapefruit</option>
              <option selected value="coconut">Coconut</option>
              <option value="mango">Mango</option> */}
              {categories.map((cat) => (<option key={cat.id} value={cat.value}>{cat.name}</option>))}
            </select>

            <input type="date" max={max_date} name="date" placeholder="Date" className="my-2 input input-bordered w-full" />
            <textarea name="description" className="textarea textarea-bordered my-2 w-full" placeholder="Description"></textarea>
            <button type='submit' className="btn w-full btn-primary my-2">Add</button>
          </form>
          {Object.keys(errorMsg).length > 0 ? <div className="toast toast-top toast-end">
            <div className={`alert ${errorMsg.type !== 'error' ? 'alert-success' : 'alert-error'}`}>
              <div>
                <span>{errorMsg.msg}</span>
              </div>
            </div>
          </div> : ""}
        </div>
      </div>
    </>
  )
}

export default InputForm
