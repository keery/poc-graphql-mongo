import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import './App.css';
import RestaurantList from '../../Components/RestaurantList/RestaurantList'
import { GET_ALL_RESTAURANTS } from '../../queries'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      client : props.client
    }
  }

  async componentDidMount() {
    const { client } = this.state

    const restaurants = await client.query({
      query : GET_ALL_RESTAURANTS
    })

    this.setState({ restaurants : restaurants.data.getRestaurants })
  }

  render() {
    const { restaurants } = this.state

    return (
      <div className="container-fluid">
        <RestaurantList restaurants={restaurants} />
      </div>
    )
  }
}

export default withApollo(App)