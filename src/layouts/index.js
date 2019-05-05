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
        enter={{ opacity: 0, transform: 'translate3d(0,10vh,0) scale3d(0.1, 0.1, 1)', config: 'slow' }}
        usual={{ opacity: 1, transform: 'translate3d(0,0vh,0) scale3d(1, 1, 1)', config: 'slow' }}
        leave={{ opacity: 0, transform: 'translate3d(0,-50vh,0) scale3d(10, 10, 1)', config: 'stiff' }}
        // mode={'immediate'}
      >
        {children}
      </TransitionProvider>
      <Header />
    </>
  )
}

export default Layout
