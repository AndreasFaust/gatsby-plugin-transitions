import React from 'react'
import propTypes from 'prop-types'
import { useStateContext } from './state'

const TransitionLink = ({
  to,
  enter,
  usual,
  leave,
  y,
  mode,
  className,
  style,
  children
}) => {
  const [, dispatch] = useStateContext()
  function onClick (event) {
    event.preventDefault()
    dispatch({ type: 'NAVIGATE', to, enter, usual, leave, y, mode })
  }
  return (
    <a
      href={to}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  )
}

TransitionLink.propTypes = {
  to: propTypes.string.isRequired,
  enter: propTypes.object,
  usual: propTypes.object,
  leave: propTypes.object,
  y: propTypes.number,
  mode: propTypes.string,
  className: propTypes.string,
  style: propTypes.object,
  children: propTypes.node
}
TransitionLink.defaultProps = {
  enter: null,
  usual: null,
  leave: null,
  y: undefined,
  mode: '',
  className: '',
  style: {},
  children: null
}

export default TransitionLink
