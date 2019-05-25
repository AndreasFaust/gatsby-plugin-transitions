import React from 'react'
import { TransitionLink } from '../transitions'

const IndexPage = ({ location }) => (
  <div className='content content--1'>
    <div className='content__inner'>
      <h1>gatsby-plugin-transitions</h1>
      <p>Transitions are easy.</p>
      <p>Now go build something great.</p>
      <TransitionLink
        to='/page-2'
        className='link-button'
        leave={{
          opacity: 0,
          transform: 'translate3d(100vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)',
          config: { clamp: true }
        }}
        usual={{
          transform: 'translate3d(0vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)',
          opacity: 1
        }}
        enter={{
          opacity: 0,
          transform: 'translate3d(100vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)',
          config: { clamp: true }
        }}
        mode='immediate'
      >
        I have a special animation!<br />
        And mode 'immediate'!<br />
        Go to page 2
      </TransitionLink>
    </div>
  </div>
  // </Transition>
)

export default IndexPage
