import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import './App.css';
import RestaurantList from '../../Components/RestaurantList'
import RestaurantDetail from '../../Components/RestaurantDetail'
import { GET_ALL_RESTAURANTS, GET_RESTAURANT_BY_ID } from '../../queries'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      client : props.client
    }
  }

  async componentDidMount() {
    const { client } = this.state

    // const restaurants = await client.query({
    //   query : GET_ALL_RESTAURANTS
    // })
    const restaurants = await client.query({
      query : GET_RESTAURANT_BY_ID,
      variables : { id : 1 }
    })

    this.setState({ restaurant : restaurants.data.getRestaurantById })
    // this.setState({ restaurants : restaurants.data.getRestaurants })
  }

  render() {
    const { restaurants } = this.state
    const restaurant = {
      name : 'etete',
      borough : 'borough',
      cuisine : 'cuisine',
    }

    return (
      <div className="container-fluid">
        <RestaurantDetail restaurant={restaurant} />
        <RestaurantList restaurants={restaurants} />
      </div>
    )
  }
}

export default withApollo(App)