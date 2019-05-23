import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { useTransitionStore } from '../transitions'

const SecondPage = ({ location }) => {
  const [, dispatch] = useTransitionStore()
  useEffect(() => {
    function onScroll () {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
        dispatch({ type: 'RETURN_TO_KEPT' })
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className='content content--2'>
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to='/'>Back to Home</Link>
    </div>
  )
}

export default SecondPage
