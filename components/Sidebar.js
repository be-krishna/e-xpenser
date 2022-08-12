import { ArrowLeftIcon, ArrowRightIcon, DocumentReportIcon, LogoutIcon, ViewGridIcon } from "@heroicons/react/outline"
import React from 'react'
import { useUser } from '../lib/hooks'
import Router, { useRouter } from "next/router"
import Link from "next/link"


const Sidebar = () => {
  const [user, { mutate }] = useUser()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/logout')
    mutate({ user: null })
    Router.push('/login')

  }

  return (
    <div className="drawer-side bg-base-100">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      {/* <ul className="bg-zinc-400 menu p-4 overflow-y-auto w-60 text-base-content"> */}

      <div className='flex flex-col items-center bg-base-100'>
        <div className="avatar p-4">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <ul className="menu bg-base-100 p-4 gap-y-2.5 overflow-y-auto w-60 sm:w-30 text-base-content">
          <li className='hover-borderd'>
            <Link href="/">
              <a className={router.pathname == "/" ? "active" : ""}>
                <ViewGridIcon className='w-6' />
                Dashboard
              </a>
            </Link>
          </li>
          <li className='hover-bordered'>
            <Link href="/expenses">
              <a className={router.pathname == "/expenses" ? "active" : ""}>
                <ArrowLeftIcon className='w-6' />
                Expenses
              </a>
            </Link>
          </li>
          <li className='hover-bordered'>
            <Link href="/revenue">
              <a className={router.pathname == "/revenue" ? "active" : ""}>
                <ArrowRightIcon className='w-6' />
                Revenue
              </a>
            </Link>
          </li>
          <li className='hover-bordered'>
            <Link href="/reports">
              <a className={router.pathname == "/reports" ? "active" : ""}>
                <DocumentReportIcon className='w-6' />
                Reports
              </a>
            </Link>
          </li>
          <li className='hover-bordered'>
            <a role="button" onClick={handleLogout}>
              <LogoutIcon className='w-6' />
              Logout
            </a>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default Sidebar
