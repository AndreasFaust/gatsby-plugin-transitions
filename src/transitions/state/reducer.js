
function getY (currentLocation) {
  const scroll = window.sessionStorage.getItem(`@@scroll|${currentLocation.key}`)
  const scrollArray = JSON.parse(scroll)
  if (!scrollArray) return 0
  return scrollArray[1]
}

function filterViews (views) {
  return views.filter(view => view)
}

function keepView (views, location) {
  if (!location.state.keep) {
    return views
      .filter(view => !view.keep)
      .map(view => {
        return view.revive
          ? { ...view, revive: false }
          : view
      })
  }

  return views
    .filter(view => !view.keep)
    .map((view, index) => {
      return index === 0
        ? { ...view, keep: true }
        : view
    })
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
        views: [null, ...keepView(filterViews(state.views), action.location)],
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
    case 'RETURN_TO_KEPT':
      const keptViewArray = state.views
        .filter(view => view.keep)
        .map(view => ({ ...view, wait: true, keep: false }))
      return {
        ...state,
        views: [
          ...keptViewArray,
          ...state.views.filter(view => !view.keep).map(view => ({ ...view, leaveForKept: true }))
        ]
      }
    case 'REVIVE_KEPT':
      return {
        ...state,
        views: state.views.map(view => ({
          ...view,
          revive: true,
          keep: false,
          wait: false
        }))
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
