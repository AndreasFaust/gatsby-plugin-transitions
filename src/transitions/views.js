import React, { useEffect } from 'react'
import { useStateContext } from './state'

import View from './view'
import Keep from './keep'

function getY ({ view, keep, currentLocation }) {
  const isKeep = keep && keep.props.location.pathname === view.props.location.pathname
  if (isKeep) return keep.y
  if (currentLocation && currentLocation.state && currentLocation.state.y) return currentLocation.state.y
  return 0
}

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
    // const currentMode = (currentLocation && currentLocation.state && currentLocation.state.mode) || mode
    // console.log(currentMode)
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
            enter={(currentLocation && currentLocation.state && currentLocation.state.enter) || enter}
            leave={(currentLocation && currentLocation.state && currentLocation.state.leave) || leave}
            usual={(currentLocation && currentLocation.state && currentLocation.state.usual) || usual}
            mode={mode}
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
