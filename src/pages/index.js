import React from 'react'
import { Link } from 'gatsby'
// import { Transition } from 'transitions'

const IndexPage = ({ location }) => (
  // <Transition
  //   location={location}
  // >
  <div className='content content--1'>
    <h1>gatsby-plugin-transitions</h1>
    <p>Transitions are easy.</p>
    <p>Now go build something great.</p>
    <Link to='/page-2/'>Go to page 2</Link>
  </div>
  // </Transition>
)

export default IndexPage
