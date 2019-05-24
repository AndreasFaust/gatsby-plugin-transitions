import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
// import { useTransitionStore } from '../transitions'

const SecondPage = ({ location }) => {
  // const [, dispatch] = useTransitionStore()
  // useEffect(() => {
  //   function onScroll () {
  //     if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
  //       // dispatch({ type: 'RETURN_TO_KEPT' })
  //       window.setTimeout(() => {
  //         navigate('/')
  //       }, 500)
  //     }
  //   }
  //   window.addEventListener('scroll', onScroll)
  //   return () => window.removeEventListener('scroll', onScroll)
  // }, [])

  return (
    <div className='content content--2'>
      <div className='content__inner'>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        {/* <Link to='/' state={{ y: 500 }}>Back to Home</Link> */}
        <Link to='/'>Back to Home</Link>
      </div>
    </div>
  )
}

export default SecondPage
