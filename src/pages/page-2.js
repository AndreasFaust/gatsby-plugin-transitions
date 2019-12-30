import React, { useEffect } from 'react'
// import { Link } from 'gatsby'
import { TransitionLink, useTransitionStore } from '../transitions'

const SecondPage = () => {
  const [{ hasEntered }, dispatch] = useTransitionStore()
  useEffect(() => {
    function onScroll() {
      if (!hasEntered) return
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
        dispatch({
          type: 'NAVIGATE',
          to: '/',
          leave: {
            opacity: 0,
            transform: 'translate3d(0, -50vh, 0)',
            config: 'stiff'
          },
          y: 200,
          mode: 'immediate'
        })
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [hasEntered, dispatch])

  return (
    <div className='content content--2'>
      <div className='content__inner'>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <TransitionLink
          style={{ color: 'yellow' }}
          to='/page-3'
          className='link-button'
          leave={{
            opacity: 0,
            transform: 'translate3d(0vh,0vh,0) scale3d(1, 1, 1) rotate(180deg)',
            config: { clamp: true }
          }}
          usual={{
            transform: 'translate3d(0vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)',
            opacity: 1
          }}
          enter={{
            opacity: 0,
            transform: 'translate3d(0vh,0vh,0) scale3d(1, 1, 1) rotate(180deg)',
            config: { clamp: true }
          }}
          mode='immediate'
          y={400}
        >
          I also have a special animation!<br />
          Go to page 3
        </TransitionLink>
        Scroll down to go back to Home!
      </div>
    </div>
  )
}

export default SecondPage
