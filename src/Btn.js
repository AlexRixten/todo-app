import React from 'react'

export const Btn = (props) => {

  return (
    <div
      className={`btn ${props.isPressed ? 'is-active' : ''}`}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </div>
  )
}
