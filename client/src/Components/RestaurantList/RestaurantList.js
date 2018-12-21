import React, { Fragment, Component } from 'react';
import { withApollo } from 'react-apollo';
import { GET_ALL_RESTAURANTS } from '../../queries'

class RestaurantList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      client : props.client,
      restaurants : props.restaurants
    };
  }

  async componentDidMount() {
    const { client } = this.state

    const restaurants = await client.query({
      query : GET_ALL_RESTAURANTS
    })
    // const restaurants = await client.query({
    //   query : GET_RESTAURANT_BY_ID,
    //   variables : { id : 1 }
    // })

    // this.setState({ restaurant : restaurants.data.getRestaurantById })
    this.setState({ restaurants : restaurants.data.getRestaurants })
  }

  render() {
    const { restaurants } = this.state

    return (
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
      </Fragment>)
  }
}

RestaurantList.defaultProps = {
  restaurants : []
}

export default withApollo(RestaurantList)