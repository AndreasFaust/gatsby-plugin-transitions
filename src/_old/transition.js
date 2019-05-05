// import React, { useState, useEffect, useContext } from 'react'
// import Animation from './animation'

// import { useStateContext } from './state'

// const Transition = ({
//   location,
//   children,
//   from,
//   to,
//   config
// }) => {
//   const { store, dispatch } = useContext(context)
//   const [hasAnimated, setHasAnimated] = useState(false)
//   const [initial, setInitial] = useState(true)

//   useEffect(() => {
//     if (initial) return
//     if (store.pathname.to === location.pathname) return
//     dispatch({
//       type: 'leavingChild',
//       payload: children
//     })
//   }, [store.pathname.to])

//   useEffect(() => {
//     setInitial(false)
//   }, [])

//   return (
//     <Animation
//       from={store.pathname.enter.from}
//       to={store.pathname.enter.to}
//       config={store.pathname.enter.config}
//     >
//       {children}
//     </Animation>
//   )
// }

// export default Transition
