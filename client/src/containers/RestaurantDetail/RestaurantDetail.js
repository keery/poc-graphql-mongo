import React, { Component } from 'react';
import { withApollo } from 'react-apollo'
import { Link } from 'react-router-dom'
import { GET_RESTAURANT_BY_ID } from '../../gql/queries'
import Loader from '../../components/Loader'

class RestaurantDetail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      client      : props.client,
      id          : props.match.params.id,
      restaurants : null,
      address     : {}
    };
  }
  
  async componentDidMount() {
    const { client, id } = this.state
    const restaurant = await client.query({
      query     : GET_RESTAURANT_BY_ID,
      variables : { id }
    })
    this.setState({ ...restaurant.data.getRestaurantById })
  }

  render() { 
    const { id, borough, cuisine, name, address : { building, street, zipcode }, grades} = this.state

    if (!name) return <Loader />

    return (
      <div className="card">
        <div className="card-header">
          <span className="badge badge-light">{id}</span>
          {name}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <div className="blockquote-footer">Situated in <cite title="Source Title">{building} {street}, {zipcode} in { borough }</cite></div>
            <p>This restaurant make { cuisine.toLowerCase() } food</p>
            <div className="blockquote-footer">
            { grades && grades.length > 0 && 
              <div>
                <div>Grades :</div>
                { grades.map(({grade, score}, i) => <div key={i}><b>{grade}</b> : {score}</div>)}
              </div>
            }
            </div>
          </blockquote>
        </div>
        <Link to="/restaurants" className="btn btn-primary">Back to list</Link>
      </div>)
  }
  
}

export default withApollo(RestaurantDetail)
