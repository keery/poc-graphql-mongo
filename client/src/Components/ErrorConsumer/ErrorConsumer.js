import React from 'react'
import { ErrorContext } from '../../context'
import uniqid from 'uniqid'

const ErrorConsumer = () => (
  <ErrorContext.Consumer>
    { ({errors}) => {
      if (errors && errors.length > 0) {
        return (
          errors.map(({msg, type}, i) => (
            <div className={`alert alert-${type}`} key={uniqid()}>
              { msg }
            </div>
          ))
        )
      }
    }}
  </ErrorContext.Consumer>
)

export default ErrorConsumer