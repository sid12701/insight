import React, { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps{
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    )
}


export default Layout