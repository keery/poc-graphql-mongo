import React, { Component } from 'react';
import { withApollo } from 'react-apollo'
import { Link } from 'react-router-dom'

import { GET_RESTAURANT_BY_ID, GET_ALL_RESTAURANTS, DELETE_RESTAURANT } from '../../gql'
import { ErrorContext }  from '../../context'
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

  deleteRestaurant = async () => {
    const { client, id : _id } = this.state
    
    const { data : { deleteRestaurant : success  } } = await client.mutate({
      mutation  : DELETE_RESTAURANT,
      variables : { _id },
      // Refresh cache
      refetchQueries : [{
        query: GET_ALL_RESTAURANTS
      }],
      awaitRefetchQueries : true
    })
    
    if(success) {
      this.context.throwError({
        msg : `Restaurant with id ${_id} was deleted`,
        type : 'success'
      })
      this.props.history.push(`/restaurants`)
    }
    else this.context.throwError({
        msg : `An error occured`,
        type : 'danger'
      })
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
            <div className="text-right">
              <button onClick={this.deleteRestaurant}><span role="img" aria-label="Cross icon">❌</span></button>
            </div>
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

RestaurantDetail.contextType = ErrorContext
export default withApollo(RestaurantDetail)
