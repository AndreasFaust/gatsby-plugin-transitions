import React, { createContext, useContext, useEffect, useReducer } from 'react'
import propTypes from 'prop-types'
import validateSpring from './utils/validateSpring'
import reducer from './reducer'

export const TransitionContext = createContext()

const TransitionProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    currentLocation: { key: undefined },
    prevLocation: null,
    views: [],
    queue: null,
    mode: props.mode,
    enter: validateSpring(props.enter),
    usual: validateSpring(props.usual),
    leave: validateSpring(props.leave),
    hasEntered: false
  })

  useEffect(() => {
    dispatch({
      type: 'UPDATE_MODE',
      mode: props.mode
    })
  }, [props.mode])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_LOCATION',
      location: props.location
    })
  }, [props.location.pathname])

  return (
    <TransitionContext.Provider value={[state, dispatch]}>
      {props.children}
    </TransitionContext.Provider>
  )
}

TransitionProvider.propTypes = {
  location: propTypes.object,
  mode: propTypes.oneOf(['successive', 'immediate']),
  children: propTypes.node,
  enter: propTypes.object,
  usual: propTypes.object,
  leave: propTypes.object,
  style: propTypes.object
}

TransitionProvider.defaultProps = {
  mode: 'successive',
  location: {},
  children: null,
  enter: { opacity: 0, config: 'stiff' },
  usual: { opacity: 1, config: 'stiff' },
  leave: { opacity: 0, config: 'stiff' },
  style: null
}

export { TransitionProvider }
export const useTransitionStore = () => useContext(TransitionContext)
