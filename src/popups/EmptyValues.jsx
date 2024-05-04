//This component is named wrongly//
import React, { useState } from 'react'

const EmptyValues = ({ message }) => {
  return (
    <div className="empty-values" style={{ borderColor: message[1] }}>
      {message[0]}
    </div>
  )
}

export default EmptyValues
