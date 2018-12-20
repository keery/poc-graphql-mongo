import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList'
import { withApollo } from 'react-apollo';
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
    this.setState({ restaurants })
  }

  render() {
    return (
      <div><MovieList /></div>
    )
  }
}

export default withApollo(App)