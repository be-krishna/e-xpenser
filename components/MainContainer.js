import React from 'react'

const MainContainer = ({ children }) => {
  return (
    <div className="drawer-content flex flex-col items-center justify-center p-2 md:max-h-screen lg:max-h-screen">
      {children}
    </div>
  )
}

export default MainContainer
