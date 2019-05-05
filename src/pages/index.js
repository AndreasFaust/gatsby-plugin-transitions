import React from 'react'
import { Link } from 'gatsby'
// import { Transition } from 'transitions'

const IndexPage = ({ location }) => (
  // <Transition
  //   location={location}
  // >
  <div className='content content--1'>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to='/page-2/'>Go to page 2</Link>
  </div>
  // </Transition>
)

export default IndexPage
