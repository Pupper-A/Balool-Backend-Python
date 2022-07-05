import React from 'react';
import { Alert } from 'react-bootstrap'

function Message(variant, child) {
  return (
    <Alert variant={variant}>
        {child}
    </Alert>
  )
}

export default Message