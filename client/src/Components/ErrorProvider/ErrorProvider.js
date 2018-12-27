import React, { Component } from 'react'
import { ErrorContext } from '../../context'

class ErrorProvider extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      errors : []
    }
  }

  componentDidMount() {
    document.addEventListener("throwError", ({detail}) => this.throwError(detail));
  }

  componentWillUnmount() {
    // Make sure to remove the DOM listener when the component is unmounted.
    console.log('unmount');
    // document.removeEventListener("throwError", () => console.log('exit'));
  }

  throwError = (error) => {
    if (error.msg) {
      const { errors } = this.state

      if(!error.type || !['warning', 'danger', 'success', 'primary'].includes(error.type)) error.type = 'primary'
      
      errors.push(error)
      this.setState({ errors })
    }
  }

  render() {
    const { children } = this.props
    const { errors } = this.state

    return (
      <ErrorContext.Provider value={{
        errors,
        throwError : this.throwError
      }}>
        { children }
      </ErrorContext.Provider>
    )
  }
}

export default ErrorProvider
