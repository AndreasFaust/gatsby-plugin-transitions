import React, { useEffect } from 'react'
import { useStateContext } from './state'
import { navigate } from 'gatsby'

import View from './view'
import Keep from './keep'

function getY ({ view, keep, currentLocation }) {
  const isKeep = keep && keep.props.location.pathname === view.props.location.pathname
  if (isKeep) return keep.y
  if (currentLocation && currentLocation.y) {
    return currentLocation.y
  }
  return 0
}

const TransitionViews = ({ location, enter, usual, leave, mode, children, style }) => {
  const [{ to, currentLocation, views, queue, keep, modeInterim }, dispatch] = useStateContext()

  useEffect(() => {
    dispatch({
      type: 'UPDATE_MODE',
      mode
    })
  }, [mode])

  useEffect(() => {
    if (to) navigate(to)
  }, [to])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_LOCATION',
      location
    })
  }, [location.pathname])

  useEffect(() => {
    const currentMode = modeInterim || mode
    if (currentMode === 'successive') {
      if (views.filter(view => view).length && !queue) {
        dispatch({ type: 'ADD_QUEUE', view: children })
      } else {
        dispatch({ type: 'ADD_VIEW_DIRECTLY', view: children })
      }
    }
    if (currentMode === 'immediate') {
      dispatch({ type: 'ADD_VIEW_DIRECTLY', view: children })
    }
  }, [children.key])

  return (
    <div className='views' style={style}>
      {views.map((view, index) => {
        if (!view) return null
        const isKeep = keep && keep.props.location.pathname === view.props.location.pathname
        return (
          <View
            key={view.props.location.key}
            view={view}
            leave={(currentLocation && currentLocation.leave) || leave}
            usual={(currentLocation && view.props.location.pathname === currentLocation.pathname && currentLocation.usual) || usual}
            enter={(currentLocation && view.props.location.pathname === currentLocation.pathname && currentLocation.enter) || enter}
            mode={(currentLocation && currentLocation.mode) || mode}
            isKeep={isKeep}
            skipEnterAnimation={isKeep}
            skipLeaveAnimation={isKeep}
            y={getY({ keep, view, currentLocation })}
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
