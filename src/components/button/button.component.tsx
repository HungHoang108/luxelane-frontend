import React from 'react'

import { ButtonType } from '../../types/button.types'

import "./button.component.styles.scss"

const Button = ({name} : ButtonType) => {
  return (
    <div>
        <button>{name}</button>
    </div>
  )
}

export default Button