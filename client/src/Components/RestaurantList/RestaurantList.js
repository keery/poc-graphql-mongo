import React, { Fragment } from 'react';

const RestaurantList = ({ restaurants }) => (
  <Fragment>
    <h1>Restaurants in New-York</h1>
    <ul className="row">
      { restaurants.length > 0 && restaurants.map(({name, borough, cuisine}, i) => (
        <div className="col-4" key={i}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{ name }</h5>
              <p className="card-text"><b>Cuisine :</b> { cuisine }</p>
              <p className="card-text"><b>Borough :</b> { borough }</p>
              <a href="#" className="btn btn-primary">See more</a>
            </div>
          </div>
        </div>
      )) }
    </ul>
  </Fragment>
)

RestaurantList.defaultProps = {
  restaurants : []
}

export default RestaurantList