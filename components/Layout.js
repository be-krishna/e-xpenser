import React from 'react'
import { useUser } from '../lib/hooks'
import AlertModal from './AlertModal'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  const [user] = useUser()
  return (
    <>
      {user
        ?
        <div className="drawer drawer-mobile">
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
