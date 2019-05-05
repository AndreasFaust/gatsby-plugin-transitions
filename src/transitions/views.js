import React, { useEffect, useReducer, useRef } from 'react'
import { useStateContext } from './state'
// import usePrev from './hooks/usePrev'
import View from './view'

const TransitionViews = ({ location, children }) => {
  const [{ currentLocation, views, mode }, dispatch] = useStateContext()
  // const prevLocation = usePrev(currentLocation)

  useEffect(() => {
    if (currentLocation.pathname !== location.pathname) {
      dispatch({
        type: 'UPDATE_LOCATION',
        location
      })
    }
  }, [location.pathname])

  useEffect(() => {
    if (currentLocation.pathname !== children.key) {
      dispatch({
        type: 'ADD_QUEUE',
        view: children
      })
      if (mode === 'immediate') {
        dispatch({ type: 'ADD_VIEW' })
      }
    }
  }, [children.key])

  return (
    <div className='views'>
      {views.map((view, index) => {
        if (!view) return null
        return (
          <View
            key={view.key}
            view={view}
            action={!index ? 'enter' : 'leave'}
            style={{
              width: '100%',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateAreas: 'View'
            }}
          />
        )
      })}
    </div>
  )
}

export default TransitionViews
