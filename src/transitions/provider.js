import React from 'react'
import propTypes from 'prop-types'
import { StateProvider, reducer } from './state'
import Views from './views'

const TransitionProvider = ({ location, mode, children }) => {
  return (
    <StateProvider reducer={reducer} initialState={{
      currentLocation: location,
      prevLocation: null,
      views: [children],
      queue: null,
      mode
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
  children: propTypes.node
}
TransitionProvider.defaultProps = {
  mode: 'successive',
  location: {},
  children: null
}

export default TransitionProvider
