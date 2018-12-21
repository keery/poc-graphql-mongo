import React from 'react';

const RestaurantDetail = ({ restaurant : { id, name, borough, cuisine }}) => (
  <div className="card">
    <div className="card-header">
      {id}
      {name}
    </div>
    <div className="card-body">
      <blockquote className="blockquote mb-0">
        <p>Borough : { borough }</p>
        <p>Cuisine : { cuisine }</p>
        <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
      </blockquote>
    </div>
  </div>
)

export default RestaurantDetail