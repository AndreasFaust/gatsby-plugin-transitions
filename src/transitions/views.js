import React, { useEffect } from 'react'
import { useStateContext } from './state'
// import usePrev from './hooks/usePrev'
import View from './view'

// import validateSpring from './utils/validateSpring'

function getAction (index, view) {
  if (view.revive) return 'revive'
  if (view.wait) return 'wait'
  if (view.keep) return 'stay'
  if (!index) return 'enter'
  return 'leave'
}

const TransitionViews = ({ location, enter, usual, leave, mode, children }) => {
  const [{ currentLocation, views, queue }, dispatch] = useStateContext()
  // const validEnter = useMemo(() => validateSpring(enter), [enter])
  // const validUsual = useMemo(() => validateSpring(usual), [usual])
  // const validLeave = useMemo(() => validateSpring(leave), [leave])
  useEffect(() => {
    dispatch({
      type: 'UPDATE_MODE',
      mode
    })
  }, [mode])

  // useEffect(() => {
  //   dispatch({
  //     type: 'UPDATE_SPRINGS',
  //     enter: validateSpring(enter),
  //     usual: validateSpring(usual),
  //     leave: validateSpring(leave)
  //   })
  //   // console.log('update Springs!')
  // }, [enter, usual, leave])

  useEffect(() => {
    if (location.state && location.state.ignore) return
    if (currentLocation.key === location.key) return
    dispatch({
      type: 'UPDATE_LOCATION',
      location
    })
  }, [location.pathname])

  useEffect(() => {
    // if (children.props.location.state && children.props.location.state.ignore) return
    if (currentLocation.key === children.props.location.key) return

    if (mode === 'successive') {
      if (views.filter(view => view).length && !queue) {
        dispatch({ type: 'ADD_QUEUE', view: children })
        // console.log('ADD_QUEUE!')
      } else {
        dispatch({ type: 'ADD_VIEW_DIRECTLY', view: children })
        // console.log('ADD_VIEW_DIRECTLY!')
      }
    }
    if (mode === 'immediate') {
      dispatch({ type: 'ADD_VIEW_DIRECTLY', view: children })
    }
  }, [children.props.location.pathname])

  return (
    <div className='views'>}
      {views.map((view, index) => {
        console.log(view)
        if (!view) return null
        return (
          <View
            key={view.props.location.key}
            view={view}
            action={getAction(index, view)}
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
// export default React.memo(TransitionViews, (prevProps, nextProps) => {
//   console.log(prevProps.location.key)
//   console.log(nextProps.location.key)
//   if (prevProps.location.key !== nextProps.location.key) return true
//   if (prevProps.children.props.location.key !== nextProps.children.props.location.key) return true
//   if (prevProps.mode !== nextProps.mode) return true
//   return false
// })
