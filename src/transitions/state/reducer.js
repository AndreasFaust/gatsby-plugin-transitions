
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
      return {
        ...state,
        currentLocation: action.location,
        prevLocation: {
          ...state.currentLocation,
          y: getY(state.currentLocation)
        },
        views: [null, ...filterViews(state.views)],
        keep: action.location.state.keep
          ? { ...state.views[0], y: getY(state.currentLocation) }
          : state.keep,
        hasEntered: false
      }
    case 'ADD_QUEUE':
      return {
        ...state,
        queue: action.view
      }
    case 'REMOVE_VIEW':
      return {
        ...state,
        views: state.views.filter(view => {
          if (view && view.props.location.key === action.locationKey) return false
          return true
        })
      }
    case 'ADD_VIEW_FROM_QUEUE':
      return {
        ...state,
        views: [state.queue, ...filterViews(state.views)],
        queue: null
      }
    case 'ADD_VIEW_DIRECTLY':
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
    case 'HAS_ENTERED':
      return {
        ...state,
        hasEntered: true
      }
    case 'REMOVE_KEEP':
      return {
        ...state,
        keep: null
      }
    default: return state
  }
}
