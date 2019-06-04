import React from 'react'
import propTypes from 'prop-types'
import { useTransitionStore } from './provider'

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
  const [, dispatch] = useTransitionStore()
  function onClick (event) {
    event.preventDefault()
    const scrollY = typeof y === 'function' ? y() : y
    dispatch({ type: 'NAVIGATE', to, enter, usual, leave, y: scrollY, mode })
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
  y: propTypes.oneOfType([propTypes.number, propTypes.func]),
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
