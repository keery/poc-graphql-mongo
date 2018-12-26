import React, { Component, Fragment } from 'react';

class RestaurantForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() { 

    return (
      <Fragment>
        <h1>Adding new restaurant</h1>
        <form>
          <div className="form-group row">
            <label htmlFor="nameRest" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="nameRest" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="cuisineRest" className="col-sm-2 col-form-label">Cuisine type</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="cuisineRest" />
            </div>
          </div>
          <h2>Address :</h2>
          <div className="form-group row">
            <label htmlFor="zipRest" className="col-sm-2 col-form-label">Zip code</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="zipRest" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="buildingRest" className="col-sm-2 col-form-label">Building</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="buildingRest" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="streetRest" className="col-sm-2 col-form-label">Street</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="streetRest" />
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-primary btn-block">Add</button>
          </div>
        </form>
      </Fragment>
    )
  }
  
}

export default RestaurantForm
