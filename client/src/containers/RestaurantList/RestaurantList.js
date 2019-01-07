import React, { Fragment, Component } from 'react'
import { withApollo } from 'react-apollo'
import { GET_ALL_RESTAURANTS } from '../../gql/queries'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'

class RestaurantList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // Adding apollo client in our state, it was injected in props with function "withApollo" which wrap our component
      client : props.client,
      restaurants : props.restaurants
    };
  }

  async componentDidMount() {
    const { client } = this.state

    // Make a query to GQL server
    const restaurants = await client.query({
      query : GET_ALL_RESTAURANTS
    })

    this.setState({ restaurants : restaurants.data.getRestaurants })
  }

  render() {
    const { restaurants } = this.state
    if (restaurants.length === 0) return <Loader />

    return (
      <Fragment>
        <h1>Restaurants in New-York</h1>
        <ul className="row">
          { restaurants.length > 0 && restaurants.map(({_id : id, name, borough, cuisine}) => (
            <div className="col-4" key={id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ name }</h5>
                  <p className="card-text"><b>Cuisine :</b> { cuisine }</p>
                  <p className="card-text"><b>Borough :</b> { borough }</p>
                  <Link to={`/restaurant/${id}`} className="btn btn-primary">See more</Link>
                </div>
              </div>
            </div>
          )) }
        </ul>
      </Fragment>)
  }
}

RestaurantList.defaultProps = {
  restaurants : []
}

export default withApollo(RestaurantList)