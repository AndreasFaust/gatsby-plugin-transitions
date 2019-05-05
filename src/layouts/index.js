import React from 'react'
import { TransitionProvider } from '../transitions'
import { Link } from 'gatsby'

import './reset.scss'
import './index.scss'

const Header = () => {
  return (
    <header className='header'>
      <Link to='/' className='header__link'>
        Home
      </Link>
      <Link to='/page-2' className='header__link'>
        Page-2
      </Link>
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
        enter={{
          opacity: 0,
          transform: 'translate3d(0,10vh,0) scale3d(1, 1, 1)',
          config: {
            mass: 1,
            tension: 210,
            friction: 20,
            clamp: true
          },
          onRest: (props) => {
            console.log('onRest!')
            console.log(props)
          }
        }}
        usual={{
          opacity: 1,
          transform: 'translate3d(0,0vh,0) scale3d(1, 1, 1)'
          // config: 'slow',
          // onRest: (props) => { console.log(props) }
        }}
        leave={{
          opacity: 0,
          transform: 'translate3d(0,-50vh,0) scale3d(10, 10, 1)',
          config: {
            mass: 1,
            tension: 210,
            friction: 20,
            clamp: true
          }
        }}
        // mode={'immediate'}
      >
        {children}
      </TransitionProvider>
      <Header />
    </>
  )
}

export default Layout
