import React from 'react'
import { TransitionLink } from '../transitions'
// import { Transition } from 'transitions'

const IndexPage = ({ location }) => (
  // <Transition
  //   location={location}
  // >
  <div className='content content--1'>
    <div className='content__inner'>
      <h1>gatsby-plugin-transitions</h1>
      <p>Transitions are easy.</p>
      <p>Now go build something great.</p>
      <TransitionLink
        to='/page-2'
        leave={{
          opacity: 0,
          transform: 'translate3d(0,-100vh,0) scale3d(1, 1, 1)',
          config: {
            // duration: 3000,
            clamp: true
          },
          onStart: () => {
            console.log('ICH BIN ONSTART??')
          }
        }}
        enter={{
          opacity: 0,
          transform: 'translate3d(0,20vh,0) scale3d(1, 1, 1)'
          // config: {
          //   duration: 3000,
          //   clamp: true
          // }
        }}
        y={1000}
        mode='immediate'
      >
        Go to page 2
      </TransitionLink>
    </div>
  </div>
  // </Transition>
)

export default IndexPage
