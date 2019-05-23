import React from 'react'
import { Link } from 'gatsby'
// import { Transition } from 'transitions'

const SecondPage = ({ location }) => (
  // <Transition
  //   location={location}
  // >
  <div className='content content--3'>
    <h1>Hi from the third page</h1>
    <p>Welcome to page 3</p>
    <Link to='/'>Back to Home</Link>
  </div>
  // </Transition>
)

export default SecondPage
