import React, { useState } from 'react'
import { TransitionProvider, TransitionViews } from '../transitions'
import Header from './header'

import './reset.scss'
import './index.scss'

const Layout = ({
  location, data, children
}) => {
  const [mode, setMode] = useState('successive')
  return (
    <TransitionProvider
      location={location}
      mode={mode}
      enter={{
        opacity: 0,
        transform: 'translate3d(0,20vh,0) scale3d(1, 1, 1) rotate(0deg)',
        // config: { duration: 3000 },
        onStart: () => {
          console.log('HELLO WORLD!')
        }
      }}
      usual={{
        opacity: 1,
        transform: 'translate3d(0vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)'
      }}
      leave={{
        opacity: 0,
        transform: 'translate3d(0vh,0vh,0) scale3d(2, 2, 1) rotate(0deg)',
        config: { clamp: true }
      }}
    >
      <TransitionViews>
        {children}
      </TransitionViews>
      <Header setMode={setMode} />
    </TransitionProvider>
  )
}

export default Layout
