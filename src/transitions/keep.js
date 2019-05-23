import React from 'react'

const TransitionKeep = ({ view }) => {
  return (
    <div
      className='view-container'
      style={{
        width: '100%',
        gridArea: 'View',
        top: 0,
        position: 'fixed',
        transform: `translate3d(0,-${view.y}px,0)`,
        zIndex: -1
      }}
    >
      <div className='view view--keep'>
        {view}
      </div>
    </div>
  )
}

export default TransitionKeep
