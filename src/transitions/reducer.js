import validateSpring from './utils/validateSpring'

function getY (key) {
  const scroll = window.sessionStorage.getItem(`@@scroll|${key}`)
  const scrollArray = JSON.parse(scroll)
  if (!scrollArray) return 0
  return scrollArray[1]
}

function filterViews (views) {
  return views.filter(view => view)
}

export default (state, action) => {
  switch (action.type) {
    case 'NAVIGATE':
      return {
        ...state,
        to: action.to,
        enterInterim: action.enter && validateSpring(action.enter),
        usualInterim: action.usual && validateSpring(action.usual),
        leaveInterim: action.leave && validateSpring(action.leave),
        modeInterim: action.mode,
        keepInterim: action.keep,
        y: action.y
      }
    case 'UPDATE_LOCATION':
      const locationScrollY = getY(action.location.key)
      return {
        ...state,
        to: undefined,
        y: undefined,
        enterInterim: null,
        usualInterim: null,
        leaveInterim: null,
        modeInterim: '',
        currentLocation: {
          ...action.location,
          skipAnimations: locationScrollY && window.safari,
          enter: state.enterInterim,
          usual: state.usualInterim,
          leave: state.leaveInterim,
          y: state.y || locationScrollY || 0,
          mode: state.modeInterim
        },
        prevLocation: {
          ...state.currentLocation,
          y: state.currentLocation && getY(state.currentLocation.key)
        },
        views: [null, ...filterViews(state.views)],
        keep: state.keepInterim
          ? { ...state.views[0], y: state.currentLocation && getY(state.currentLocation.key) }
          : state.keep,
        keepInterim: false,
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
