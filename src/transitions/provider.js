import React from 'react'
import propTypes from 'prop-types'
import { StateProvider, reducer } from './state'
import Views from './views'
import validateSpring from './utils/validateSpring'

const TransitionProvider = (props) => {
  return (
    <StateProvider reducer={reducer} initialState={{
      currentLocation: props.location,
      prevLocation: null,
      views: [props.children],
      queue: null,
      mode: props.mode,
      enter: validateSpring(props.enter),
      usual: validateSpring(props.usual),
      leave: validateSpring(props.leave),
      hasEntered: false
    }}>
      <Views {...props} />
    </StateProvider>
  )
}

TransitionProvider.propTypes = {
  location: propTypes.object,
  mode: propTypes.oneOf(['successive', 'immediate']),
  children: propTypes.node,
  enter: propTypes.object,
  leave: propTypes.object
}

TransitionProvider.defaultProps = {
  mode: 'successive',
  location: {},
  children: null,
  enter: { opacity: 0, config: 'stiff' },
  usual: { opacity: 1, config: 'stiff' },
  leave: { opacity: 0, config: 'stiff' }
}

export default TransitionProvider
