import React, { useState, useEffect } from 'react'
import { useStateContext } from './state'
// import usePrev from './hooks/usePrev'
import { useSpring, animated, config } from 'react-spring'

const TransitionView = ({ view, action }) => {
  const [{ prevLocation, mode }, dispatch] = useStateContext()
  const [styles, setStyles] = useState({
    position: 'fixed',
    transform: `translate3d(0,-${prevLocation && prevLocation.y[1]}px,0)`
  })
  const [props, set] = useSpring(() => ({
    opacity: 0,
    y: 50,
    config: { ...config.stiff, clamp: true }
    // config: { duration: 3000 }
  }))

  useEffect(() => {
    if (action === 'enter') {
      set({
        opacity: 1,
        y: 0,
        onRest: () => {
          if (mode === 'immediate') {
            window.scrollTo(0, 0)
          }
          setStyles({
            position: 'relative',
            transform: 'translate3d(0, 0px, 0)'
          })
        }
      })
    } else {
      set({
        opacity: 0,
        y: 1,
        onRest: () => {
          dispatch({ type: 'REMOVE_VIEW', pathname: view.key })
          if (mode === 'successive') {
            window.scrollTo(0, 0)
            dispatch({ type: 'ADD_VIEW' })
          }
        }
      })
    }
  }, [action])
  return (
    <div
      className='view-container'
      style={{
        width: '100%',
        gridArea: 'View',
        willChange: 'transform',
        ...styles,
        top: 0
      }}
    >
      <animated.div
        style={{
          width: '100%',
          willChange: 'opacity, transform',
          opacity: props.opacity,
          transform: props.y.interpolate((y) => `translate3d(0,${y}px,0)`)
        }}
        className='view'>
        {view}
      </animated.div>
    </div>
  )
}

export default TransitionView
