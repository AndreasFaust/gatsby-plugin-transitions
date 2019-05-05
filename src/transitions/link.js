import React from 'react'
import propTypes from 'prop-types'
import { useStateContext } from './state'

const TransitionLink = ({
  to,
  enter,
  leave,
  className,
  style,
  children
}) => {
  // const [{}, dispatch] = useStateContext()
  // console.log(dispatch)
  function onClick (event) {
    event.preventDefault()
    // dispatch({
    //   type: 'GOTO',
    //   to,
    //   enter,
    //   leave
    // })
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
  to: propTypes.string,
  enter: propTypes.object,
  leave: propTypes.object,
  className: propTypes.string,
  style: propTypes.object,
  children: propTypes.node
}
TransitionLink.defaultProps = {
  to: '',
  enter: {},
  leave: {},
  className: '',
  style: {},
  children: null
}

export default TransitionLink
