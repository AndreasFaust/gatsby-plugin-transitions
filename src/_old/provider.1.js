import React, { useEffect, useReducer, useRef } from 'react'
import Leave from '../leave'

const context = React.createContext()

const defaultPathname = (to = undefined) => ({
  to,
  leave: { from: {}, to: {}, config: {} },
  enter: { from: {}, to: {}, config: {} }
})

let reducer = (state, action) => {
  switch (action.type) {
    case 'pathname':
      return { ...state, pathname: action.payload }
    case 'leavingChild':
      return { ...state, leavingChild: action.payload }
    default:
  }
}

const TransitionProvider = ({ location = null, children }) => {
  const initialState = {
    pathname: defaultPathname(location.pathname),
    leavingChild: null
  }
  const [store, dispatch] = useReducer(reducer, initialState)

  return (
    <context.Provider value={{ store, dispatch }}>
      <Leave />
      {children}
    </context.Provider>
  )
}

export {
  TransitionProvider,
  context
}
