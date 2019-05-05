import React from 'react'
import { TransitionProvider, TransitionLink } from '../transitions'

import './reset.scss'
import './index.scss'

const Header = () => {
  return (
    <header className='header'>
      <TransitionLink to='/' className='header__link'>
        Home
      </TransitionLink>
      <TransitionLink to='/page-2' className='header__link'>
        Page-2
      </TransitionLink>
    </header>
  )
}

const Layout = ({
  location, data, children
}) => {
  return (
    <>
      <TransitionProvider
        location={location}
        // mode={'immediate'}
      >
        {children}
      </TransitionProvider>
      <Header />
    </>
  )
}

export default Layout
