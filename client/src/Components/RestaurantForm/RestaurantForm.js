import React, { Component, Fragment } from 'react';
import { Formik, Form, Field } from 'formik';
import ErrorForm from '../ErrorForm'
import { withApollo } from 'react-apollo'
import * as Yup from 'yup';
import { CREATE_RESTAURANT } from '../../mutations';

class RestaurantForm extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      client : props.client,
      initialValues : {
        name     : '',
        cuisine  : '',
        zipcode  : '',
        building : '',
        street   : ''
      },
      validationSchema : Yup.object().shape({
        name     : Yup.string().required(),
        cuisine  : Yup.string().required(),
        zipcode  : Yup.string().required(),
        building : Yup.number().positive().integer().required(),
        street   : Yup.string().required()
      })
    }
  }

  handleSubmit = (values) => {
    const { client } = this.state
    client.mutate({
      mutation  : CREATE_RESTAURANT,
      variables : { restaurant : values }
    })
  }

  render() { 
    const { initialValues, validationSchema } = this.state
    
    return (
      <Fragment>
        <h1>Adding new restaurant</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="form-group row">
              <label htmlFor="nameRest" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <ErrorForm name="name" />
                <Field type="text" name="name" id="nameRest" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="cuisineRest" className="col-sm-2 col-form-label">Cuisine type</label>
              <div className="col-sm-10">
                <ErrorForm name="cuisine" />
                <Field type="text" name="cuisine" id="cuisineRest" className="form-control" />
              </div>
            </div>
            <h2>Address :</h2>
            <div className="form-group row">
              <label htmlFor="zipRest" className="col-sm-2 col-form-label">Zip code</label>
              <div className="col-sm-10">
                <ErrorForm name="zipcode" />
                <Field type="text" name="zipcode" id="zipcodeRest" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="buildingRest" className="col-sm-2 col-form-label">Building</label>
              <div className="col-sm-10">
                <ErrorForm name="building" />
                <Field type="number" name="building" id="buildingRest" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="streetRest" className="col-sm-2 col-form-label">Street</label>
              <div className="col-sm-10">
                <ErrorForm name="street" />
                <Field type="text" name="street" id="streetRest" className="form-control" />
              </div>
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-primary btn-block">Add</button>
            </div>
          </Form>
        </Formik>
      </Fragment>
    )
  }
  
}

export default withApollo(RestaurantForm)