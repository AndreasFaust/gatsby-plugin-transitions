import React, { useEffect } from 'react'
import { useTransitionStore } from './provider'
import { navigate } from 'gatsby'

import View from './view'
import Keep from './keep'

function getY({ view, keep, currentLocation }) {
  const isKeep = keep && keep.props.location.pathname === view.props.location.pathname
  if (isKeep) return keep.y
  if (currentLocation && currentLocation.y) {
    return currentLocation.y
  }
  return 0
}

const TransitionViews = ({ children, style }) => {
  const [{
    enter,
    usual,
    leave,
    to,
    currentLocation,
    views,
    keep,
    mode
  }, dispatch] = useTransitionStore()

  useEffect(() => {
    if (to) navigate(to)
  }, [to])

  useEffect(() => {
    if (!currentLocation.key) return
    const currentMode = currentLocation.mode || mode
    if (currentMode === 'successive') {
      if (views.filter(view => view).length) {
        dispatch({ type: 'ADD_QUEUE', view: children })
      } else {
        dispatch({ type: 'ADD_VIEW_DIRECTLY', view: children })
      }
    }
    if (currentMode === 'immediate') {
      dispatch({ type: 'ADD_VIEW_DIRECTLY', view: children })
    }
  }, [currentLocation.key])

  return (
    <div className='views' style={style}>
      {views.map((view, index) => {
        if (!view) return null
        const isKeep = keep && keep.props.location.pathname === view.props.location.pathname
        return (
          <View
            key={view.props.location.key}
            view={view}
            leave={currentLocation.leave || leave}
            usual={(view.props.location.pathname === currentLocation.pathname && currentLocation.usual) || usual}
            enter={(view.props.location.pathname === currentLocation.pathname && currentLocation.enter) || enter}
            mode={currentLocation.mode || mode}
            isKeep={isKeep}
            skipAnimations={currentLocation.skipAnimations}
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
