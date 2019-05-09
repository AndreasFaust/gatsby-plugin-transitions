import React, { useState } from 'react'
import { TransitionProvider } from '../transitions'
import Header from './header'

import './reset.scss'
import './index.scss'

const Layout = ({
  location, data, children
}) => {
  const [mode, setMode] = useState('successive')
  return (
    <>
      <TransitionProvider
        location={location}
        mode={mode}
        enter={{
          opacity: 0,
          // transform: 'translate3d(0,10vh,0) scale3d(1, 1, 1)',
          config: {
            mass: 1,
            tension: 210,
            friction: 20,
            clamp: true
          },
          onRest: (props) => {
            // console.log('onRest!')
            // console.log(props)
          }
        }}
        usual={{
          opacity: 1,
          // transform: 'translate3d(0,0vh,0) scale3d(1, 1, 1)',
          config: {
            mass: 1,
            tension: 210,
            friction: 20,
            clamp: true
          }
          // onRest: (props) => { console.log(props) }
        }}
        leave={{
          opacity: 0,
          // transform: 'translate3d(0,-50vh,0) scale3d(10, 10, 1)',
          config: {
            mass: 1,
            tension: 210,
            friction: 20,
            clamp: true
          }
          // config: {
          //   mass: 1,
          //   tension: 210,
          //   friction: 20,
          //   clamp: true
          // }
        }}
        // mode={'immediate'}
      >
        {children}
      </TransitionProvider>
      <Header setMode={setMode} />
    </>
  )
}

export default Layout
