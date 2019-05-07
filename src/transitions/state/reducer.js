
function getY (currentLocation) {
  const scroll = window.sessionStorage.getItem(`@@scroll|${currentLocation.key}`)
  const scrollArray = JSON.parse(scroll)
  if (!scrollArray) return 0
  return scrollArray[1]
}

function filterViews (views) {
  return views.filter(view => view)
}

export default (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      // console.log('Update Location')
      return {
        ...state,
        currentLocation: action.location,
        prevLocation: {
          ...state.currentLocation,
          y: getY(state.currentLocation)
        },
        views: [null, ...filterViews(state.views)]
      }
    case 'ADD_QUEUE':
      // console.log('Add to Queue')
      return {
        ...state,
        // views: [null, ...filterViews(state.views)],
        queue: action.view
      }
    case 'REMOVE_VIEW':
      // console.log('Remove View')
      return {
        ...state,
        views: state.views.filter(view => {
          if (view && view.props.location.key === action.locationKey) return false
          return true
        })
      }
    case 'ADD_VIEW_FROM_QUEUE':
      // console.log('Add View from Queue')
      return {
        ...state,
        views: [state.queue, ...filterViews(state.views)],
        // views: state.queue
        //   ? [state.queue, ...filterViews(state.views)]
        //   : [...filterViews(state.views)],
        queue: null
      }
    case 'ADD_VIEW_DIRECTLY':
      // console.log('Add View directly')
      return {
        ...state,
        views: [action.view, ...filterViews(state.views)],
        queue: null
      }
    case 'UPDATE_MODE':
      return {
        ...state,
        mode: action.mode
      }
    // case 'UPDATE_SPRINGS':
    //   return {
    //     ...state,
    //     enter: action.enter,
    //     usual: action.usual,
    //     leave: action.leave
    //   }
    default: return state
  }
}
