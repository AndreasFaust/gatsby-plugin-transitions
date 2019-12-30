import React, { useState, useEffect } from 'react'
import { useTransitionStore } from './provider'
import { useSpring, animated } from 'react-spring'

const TransitionView = ({
  view,
  mode,
  action,
  enter,
  leave,
  usual,
  y,
  isKeep,
  skipAnimations,
  skipEnterAnimation,
  skipLeaveAnimation
}) => {
  const [{ hasEntered }, dispatch] = useTransitionStore()
  const [styles, setStyles] = useState(() => {
    if (mode === 'immediate') {
      return {
        position: 'fixed',
        transform: `translate3d(0,-${y}px,0)`
      }
    }
    if (isKeep) {
      return { opacity: 0 }
    }
    return {}
  })

  const [props, set] = useSpring(() => {
    return skipEnterAnimation
      ? usual
      // because start-callback would be called if spread-operator (spring-bug?)
      : {
        opacity: enter.opacity,
        transform: enter.transform
      }
  })
  useEffect(() => {
    switch (action) {
      case 'enter':
        set({
          ...usual,
          config: enter.config,
          onStart: (props) => {
            if (mode === 'successive' || isKeep) {
              window.scrollTo(0, y)
            }
            if (typeof enter.onStart === 'function') enter.onStart(props)
          },
          onFrame: (props) => {
            if (typeof enter.onFrame === 'function') enter.onFrame(props)
          },
          onRest: (props) => {
            if (isKeep) {
              dispatch({ type: 'REMOVE_KEEP' })
              setStyles({ opacity: 1 })
            }
            dispatch({ type: 'HAS_ENTERED' })
          }
        })
        break

      case 'leave':
        if (skipLeaveAnimation) {
          dispatch({ type: 'REMOVE_VIEW', locationKey: view.props.location.key })
          if (mode === 'successive') {
            window.scrollTo(0, 0)
            dispatch({ type: 'ADD_VIEW_FROM_QUEUE' })
          }
          return
        }
        set({
          ...leave,
          config: leave.config,
          onStart: (props) => {
            if (typeof leave.onStart === 'function') leave.onStart(props)
          },
          onFrame: (props) => {
            if (typeof leave.onFrame === 'function') leave.onFrame(props)
          },
          onRest: (props) => {
            dispatch({ type: 'REMOVE_VIEW', locationKey: view.props.location.key })
            if (mode === 'successive') {
              window.scrollTo(0, 0)
              dispatch({ type: 'ADD_VIEW_FROM_QUEUE' })
            }
            if (typeof leave.onRest === 'function') leave.onRest(props)
          }
        })
        break
      default:
    }
  }, [action])

  useEffect(() => {
    if (!hasEntered) return
    if (mode === 'immediate') {
      setStyles({
        position: 'relative',
        transform: 'translate3d(0, 0px, 0)',
        willChange: ''
      })
    }
    if (typeof enter.onRest === 'function') enter.onRest(props)
  }, [hasEntered])

  useEffect(() => {
    if (styles.position === 'relative') {
      window.scrollTo(0, y)
    }
  }, [styles.position])

  return (
    <div
      className='view-container'
      style={{
        width: '100%',
        willChange: mode === 'immediate' && 'transform',
        top: 0,
        ...styles
      }}
    >
      <animated.div
        style={{
          width: '100%',
          willChange: `opacity${enter.transform !== 'none' || usual.transform !== 'none' ? ', transform' : ''}`,
          opacity: props.opacity,
          transform: props.transform
        }}
        className='view'
      >
        {view}
      </animated.div>
    </div>
  )
}

export default TransitionView
