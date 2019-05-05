import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

const Animation = ({ from, to, config, onRest, onStart, children }) => {
  const [state] = useState({ from, to, config })
  const props = useSpring({
    clamp: true,
    precision: 0.1,
    config: state.config,
    from: state.from,
    to: state.to,
    onRest,
    onStart
  })
  return (
    <animated.div style={props}>
      {children}
    </animated.div>
  )
}

export default Animation
