// import React, { useState, useEffect, useRef, useContext } from 'react'
// import { context } from './provider'
// import { navigate } from 'gatsby'
// import Animation from './animation'

// const Leave = ({ from, to, config, leavingChild }) => {
//   const scrollY = useRef(window.scrollY)
//   const { store, dispatch } = useContext(context)
//   const [initial, setInitial] = useState(true)

//   useEffect(() => {
//     if (initial) return
//     scrollY.current = window.scrollY
//   }, [store.pathname.to])

//   useEffect(() => {
//     if (!store.leavingChild) return
//     navigate(store.pathname.to)
//     // window.setTimeout(() => navigate(store.pathname.to), 2000)
//   }, [store.leavingChild])

//   useEffect(() => {
//     setInitial(false)
//   }, [])

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         pointerEvents: 'none',
//         zIndex: 1000,
//         top: 0,
//         left: 0,
//         width: '100%',
//         transform: `translate3d(0, -${scrollY.current}px, 0)`
//       }}
//     >
//       {store.leavingChild && (
//         <Animation
//           {...store.pathname.leave}
//           onRest={() => dispatch({ type: 'leavingChild', payload: null })}
//         >
//           {store.leavingChild}
//         </Animation>
//       )}
//     </div>
//   )
// }

// export default Leave
