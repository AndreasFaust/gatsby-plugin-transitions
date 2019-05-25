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
          transform: 'translate3d(0,20vh,0) scale3d(1, 1, 1) rotate(0deg)'
        }}
        usual={{
          opacity: 1,
          transform: 'translate3d(0vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)'
          // onRest: (props) => { console.log(props) }
        }}
        leave={{
          opacity: 0,
          transform: 'translate3d(0vh,0vh,0) scale3d(1, 1, 10) rotate(0deg)'
        }}
      >
        {children}
      </TransitionProvider>
      <Header setMode={setMode} />
    </>
  )
}

export default Layout
