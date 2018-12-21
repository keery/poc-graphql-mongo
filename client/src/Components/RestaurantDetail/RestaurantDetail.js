import React, { Component } from 'react';
import { withApollo } from 'react-apollo'
import { GET_RESTAURANT_BY_ID } from '../../queries'
import Loader from '../Loader'

class RestaurantDetail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      client : props.client,
      id : parseInt(props.match.params.id),
      restaurants : null
    };
  }
  
  async componentDidMount() {
    const { client, id } = this.state

    const restaurant = await client.query({
      query : GET_RESTAURANT_BY_ID,
      variables : { id }
    })

    this.setState({ ...restaurant.data.getRestaurantById })
  }

  render() {
    const { id, borough, cuisine, name } = this.state

    if (!name) return <Loader />

    return (
      <div className="card">
        <div className="card-header">
          <span className="badge badge-light">{id}</span>
          {name}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Borough : { borough }</p>
            <p>Cuisine : { cuisine }</p>
            <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
          </blockquote>
        </div>
      </div>)
  }
  
}

export default withApollo(RestaurantDetail)
