import React from 'react'
import { Link } from 'gatsby'
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
      <Link to='/page-2/' state={{
        leave: {
          opacity: 0,
          transform: 'translate3d(0,-100vh,0) scale3d(1, 1, 1)',
          config: {
            clamp: true
          }
        },
        enter: {
          opacity: 0,
          transform: 'translate3d(0,100vh,0) scale3d(1, 1, 1)',
          config: {
            clamp: true
          }
        },
        mode: 'immediate'
      }}>Go to page 2</Link>
    </div>
  </div>
  // </Transition>
)

export default IndexPage
