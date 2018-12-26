import React from 'react'
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik'

const ErrorForm = ({name}) => (
  <ErrorMessage name={name}>
    {msg => <div className="alert alert-danger">{ msg }</div>}
  </ErrorMessage>
)

ErrorForm.propTypes = {
  name: PropTypes.string.isRequired
};

export default ErrorForm