
function getY (currentLocation) {
  const scroll = window.sessionStorage.getItem(`@@scroll|${currentLocation.key}`)
  const scrollArray = JSON.parse(scroll)
  if (!scrollArray) return 0
  return scrollArray[1]
}

export default (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION': return {
      ...state,
      currentLocation: action.location,
      prevLocation: {
        ...state.currentLocation,
        y: getY(state.currentLocation)
      },
      views: [null, ...state.views]
    }
    case 'ADD_QUEUE': return {
      ...state,
      views: [null, ...state.views],
      queue: action.view
    }
    case 'REMOVE_VIEW': return {
      ...state,
      views: state.views.filter(view => {
        if (view && view.key === action.pathname) return false
        return true
      })
    }
    case 'ADD_VIEW': return {
      ...state,
      views: [state.queue, ...state.views],
      queue: null
    }
    default: return state
  }
}
