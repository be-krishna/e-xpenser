import React from 'react'

const AlertModal = ({ title, body, action }) => {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h4 className="text-lg font-bold">Are you sure?</h4>
          <div className="modal-action">
            <label htmlFor="my-modal-4" className="btn btn-ghost">No</label>
            <label htmlFor="my-modal-4" className="btn" onClick={action}>Yes</label>
          </div>
        </label>
      </label>
    </>
  )
}

export default AlertModal
