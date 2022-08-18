import { ArrowLeftIcon, ArrowRightIcon, DocumentReportIcon, LogoutIcon, UserCircleIcon, ViewGridIcon } from "@heroicons/react/outline"
import React from 'react'
import { useUser } from '../lib/hooks'
import Router, { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"


const Sidebar = () => {
  const [user, { mutate }] = useUser()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/logout')
    mutate({ user: null })
    Router.push('/login')

  }

  return (
    <div className="drawer-side bg-base-100 card shadow-lg m-3">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      {/* <ul className="bg-zinc-400 menu p-4 overflow-y-auto w-60 text-base-content"> */}

      <div className='flex flex-col items-center bg-base-100 gap-y-3'>
        <h1 className="text-3xl font-bold mt-10 text-primary">e-xpenser</h1>
        <div className="divider px-5 m-0" />


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
            <Link href="/revenues">
              <a className={router.pathname == "/revenues" ? "active" : ""}>
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
        </ul>
        <div className="divider px-5 m-0" />

        <div className="flex items-center w-full justify-around">
          <div className="flex items-center p-2">
            <div className="avatar">
              <div className="w-8 relative rounded">
                <Image src="https://placeimg.com/192/192/people" layout="fill" objectFit="contain" alt="avatar" />
              </div>
            </div>
            <Link href="/profile"><a role="button" className="text-lg ml-3 hover:text-gray-500">{user?.name}</a></Link>
          </div>
          <LogoutIcon className='w-6 hover:text-primary cursor-pointer' onClick={handleLogout} />
        </div>
      </div>

    </div>
  )
}

export default Sidebar
