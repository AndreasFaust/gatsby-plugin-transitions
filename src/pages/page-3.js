import React from 'react'
import { Link } from 'gatsby'
// import { Transition } from 'transitions'

const SecondPage = ({ location }) => (
  <div className='content content--3'>
    <div className='content__inner'>
      <h1>Hi from the third page</h1>
      <p>Welcome to page 3</p>
      <Link className='' to='/'>Back to Home</Link>
    </div>
  </div>
)

export default SecondPage
