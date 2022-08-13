import React, { useEffect } from 'react'
import { useUser } from '../lib/hooks'
import Sidebar from './Sidebar'
import Router
  from 'next/router'
const Layout = ({ children }) => {
  const [user] = useUser()

  useEffect(() => {
    if (!user) {
      Router.push('/login')
    }
  }, [user])


  return (
    <>
      {user
        ?
        <div className="drawer drawer-mobile bg-zinc-50">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          {/* main page content */}
          {children}
          {/* main page conents end */}
          <Sidebar />
        </div>
        : children}
    </>
  )
}

export default Layout
