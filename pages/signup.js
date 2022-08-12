import { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useUser } from '../lib/hooks'

export default function SignupPage() {
  const [user, { mutate }] = useUser()
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      name: e.currentTarget.name.value,
    }

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`)
      setTimeout(() => {
        setErrorMsg('')
      }, 2000)
      return
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 201) {
      const userObj = await res.json()
      // set user to useSWR state
      mutate(userObj)
    } else {
      setErrorMsg(await res.text())
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div className="card w-2/6 max-h-full bg-base-100 shadow-lg">
          {errorMsg ? <div className="toast toast-top toast-end">
            <div className="alert alert-error">
              <div>
                <span>{errorMsg}</span>
              </div>
            </div>
          </div> : ""}
          <div className="card-body items-center">
            <h2 className="card-title">Signup</h2>
            <form onSubmit={onSubmit} className="container w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                required
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full" />
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                required
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                className="input input-bordered w-full" />
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                required
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full" />
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                required
                id="rpassword"
                type="password"
                name="rpassword"
                placeholder="Password"
                className="input input-bordered w-full" />
              <button type='submit' className="btn w-full btn-primary my-4">Signup</button>
              <div className="flex justify-center">
                <Link href="/login"><a>I have account</a></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
