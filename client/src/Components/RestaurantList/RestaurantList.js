import React from 'react';

const RestaurantList = ({ restaurants }) => (
  <ul className="row">
    { restaurants.length > 0 && restaurants.map(({name, borough, cuisine}) => (
      <div className="col-4">
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
)

RestaurantList.defaultProps = {
  restaurants : []
}

export default RestaurantList