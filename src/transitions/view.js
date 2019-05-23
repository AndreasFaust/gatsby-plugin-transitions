import React, { useState, useEffect, useRef } from 'react'
import { useStateContext } from './state'
import { useSpring, animated } from 'react-spring'
import { navigate } from 'gatsby'

const TransitionView = ({ view, action }) => {
  const [{ prevLocation, mode, enter, usual, leave }, dispatch] = useStateContext()
  const [styles, setStyles] = useState(mode === 'immediate'
    ? {
      position: 'fixed',
      transform: `translate3d(0,-${prevLocation && prevLocation.y[1]}px,0)`
    }
    : {}
  )
  const y = useRef(0)
  // const wasRevived = useRef(false)
  const [props, set] = useSpring(() => ({
    ...enter
  }))
  useEffect(() => {
    console.log(view.props.location.pathname)
    switch (action) {
      case 'wait':
        console.log('WAIT!')
        break
      case 'enter':
        console.log('ENTER!')
        set({
          ...usual,
          onRest: (props) => {
            if (mode === 'immediate') {
              window.scrollTo(0, 0)
              setStyles({
                position: 'relative',
                transform: 'translate3d(0, 0px, 0)',
                willChange: ''
              })
            }
            if (typeof usual.onRest === 'function') usual.onRest(props)
            else if (typeof enter.onRest === 'function') enter.onRest(props)
            dispatch({ type: 'HAS_ENTERED' })
          }
        })
        break

      case 'leave':
        console.log('LEAVE!')
        set({
          ...leave,
          onRest: (props) => {
            dispatch({ type: 'REMOVE_VIEW', locationKey: view.props.location.key })
            if (mode === 'successive') {
              if (view.leaveForKept) {
                dispatch({ type: 'REVIVE_KEPT' })
              } else {
                window.scrollTo(0, 0)
                dispatch({ type: 'ADD_VIEW_FROM_QUEUE' })
              }
            }
            if (typeof leave.onRest === 'function') leave.onRest(props)
          }
        })
        break

      case 'stay':
        console.log('STAY!')
        y.current = window.scrollY
        setStyles({
          position: 'fixed',
          transform: `translate3d(0,-${y.current}px,0)`,
          zIndex: -1
        })
        window.scrollTo(0, 0)
        dispatch({ type: 'ADD_VIEW_FROM_QUEUE' })
        break

      case 'revive':
        console.log('REVIVE!')
        setStyles({
          position: 'relative',
          transform: 'translate3d(0, 0px, 0)',
          willChange: '',
          zIndex: -1
        })
        // wasRevived.current = true
        // dispatch({ type: 'IS_REVIVED' })
        navigate(view.props.location.pathname, { state: { ignore: true } })
    }
  }, [action])

  useEffect(() => {
    if (styles.position === 'relative') {
      window.scrollTo(0, y.current)
    }
  }, [styles.position])
  return (
    <div
      className='view-container'
      style={{
        width: '100%',
        gridArea: 'View',
        willChange: mode === 'immediate' && 'transform',
        top: 0,
        ...styles
      }}
    >
      <animated.div
        style={{
          width: '100%',
          willChange: `opacity${enter.transform || leave.transform ? ', transform' : ''}`,
          opacity: props.opacity,
          transform: props.transform
        }}
        className='view'>
        {view}
      </animated.div>
    </div>
  )
}

export default TransitionView
