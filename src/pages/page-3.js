import React from 'react'
// import { Transition } from 'transitions'
import { TransitionLink } from '../transitions'

const SecondPage = ({ location }) => (
  <div className='content content--3'>
    <div className='content__inner'>
      <h1>Hi from the third page</h1>
      <p>Welcome to page 3</p>
      <TransitionLink
        className=''
        to='/'
        y={() => {
          console.log(window.scrollY)
          return window.scrollY
        }}
        enter={{
          opacity: 0,
          transform: 'translate3d(0vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)'
          // onRest: () => console.log(window.scrollY)
        }}
      >
        Back to Home and persist scroll-position
      </TransitionLink>
    </div>
  </div>
)

export default SecondPage
