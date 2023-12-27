import React from 'react'
import { Logo } from './_components/logo'


function AuthLayout({children}: {children : React.ReactNode}) {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
    <Logo/>
        {children}
    </div>
  )
}

export default AuthLayout