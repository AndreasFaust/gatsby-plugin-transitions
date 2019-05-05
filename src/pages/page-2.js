import React from 'react'
import { Link } from 'gatsby'
// import { Transition } from 'transitions'

const SecondPage = ({ location }) => (
  // <Transition
  //   location={location}
  // >
  <div className='content content--2'>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to='/'>Back to Home</Link>
  </div>
  // </Transition>
)

export default SecondPage
