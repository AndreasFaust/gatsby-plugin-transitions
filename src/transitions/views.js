import React, { useEffect } from 'react'
import { useStateContext } from './state'
// import usePrev from './hooks/usePrev'
import View from './view'
// import validateSpring from './utils/validateSpring'

const TransitionViews = ({ location, enter, usual, leave, mode, children }) => {
  const [{ currentLocation, views, queue }, dispatch] = useStateContext()

  useEffect(() => {
    dispatch({
      type: 'UPDATE_MODE',
      mode
    })
  }, [mode])

  useEffect(() => {
    if (currentLocation.key !== location.key) {
      dispatch({
        type: 'UPDATE_LOCATION',
        location
      })
    }
  }, [location.pathname])

  useEffect(() => {
    if (currentLocation.key === children.props.location.key) return
    if (mode === 'successive') {
      if (views.filter(view => view).length && !queue) {
        dispatch({ type: 'ADD_QUEUE', view: children })
      } else {
        dispatch({ type: 'ADD_VIEW_DIRECTLY', view: children })
      }
    }
    if (mode === 'immediate') {
      dispatch({ type: 'ADD_VIEW_DIRECTLY', view: children })
    }
  }, [children.props.location.pathname])

  return (
    <div className='views'>
      {views.map((view, index) => {
        if (!view) return null
        return (
          <View
            key={view.props.location.key}
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
