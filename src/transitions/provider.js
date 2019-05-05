import React from 'react'
import propTypes from 'prop-types'
import { StateProvider, reducer } from './state'
import validateSpring from './utils/validateSpring'
import Views from './views'

const TransitionProvider = ({
  location,
  mode,
  children,
  enter,
  usual,
  leave
}) => {
  console.log(enter)
  return (
    <StateProvider reducer={reducer} initialState={{
      currentLocation: location,
      prevLocation: null,
      views: [children],
      queue: null,
      mode,
      enter: validateSpring(enter),
      usual: validateSpring(usual),
      leave: validateSpring(leave)
    }}>
      <Views location={location}>
        {children}
      </Views>
    </StateProvider>
  )
}

TransitionProvider.propTypes = {
  location: propTypes.object,
  mode: propTypes.string,
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
