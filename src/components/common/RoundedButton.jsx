import React from 'react'

export const RoundedButton = ({textButton, prop, children}) => {
  return (
    <button
        onClick={prop}
    >
        {textButton}
        {children}
    </button>
  )
}
