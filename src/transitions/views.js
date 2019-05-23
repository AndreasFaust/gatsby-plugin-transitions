import React, { useEffect } from 'react'
import { useStateContext } from './state'

import View from './view'
import Keep from './keep'

const TransitionViews = ({ location, enter, usual, leave, mode, children }) => {
  const [{ currentLocation, views, queue, keep }, dispatch] = useStateContext()

  useEffect(() => {
    dispatch({
      type: 'UPDATE_MODE',
      mode
    })
  }, [mode])

  useEffect(() => {
    if (currentLocation.key === location.key) return
    dispatch({
      type: 'UPDATE_LOCATION',
      location
    })
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
        const isKeep = keep && keep.props.location.pathname === view.props.location.pathname
        return (
          <View
            key={view.props.location.key}
            view={view}
            isKeep={isKeep}
            skipEnterAnimation={isKeep}
            skipLeaveAnimation={isKeep}
            y={isKeep ? keep.y : 0}
            action={!index ? 'enter' : 'leave'}
          />
        )
      })}
      {keep && (
        <Keep
          key={keep.props.location.key}
          view={keep}
        />
      )}
    </div>
  )
}

export default TransitionViews
