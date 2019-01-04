import { Restaurant } from '../../models';

/**
 * Queries
 */
const query = {
  getRestaurantById : async (obj, {id}) => await Restaurant.findOne({_id : { $eq : id }}),
  getRestaurants : async (obj, {skip = 0, limit = 50}) => await Restaurant.find({$and:[{name:{ $ne: null }}, {name:{ $ne: "" }}] }).sort({name : 1}).skip(skip).limit(limit)
}


/**
 * Mutations
 */
const mutation = {
  createRestaurant : async (obj, {restaurant : {name, cuisine, building, zipcode, street}}) => {
    const restaurant = new Restaurant({
        name,
        cuisine,
        address : {
          building,
          zipcode,
          street
        }
    });

    const res = await restaurant.save()
    .then(({_id}) => ({_id}))
    .catch(({_message}) => new Error(_message))

    return res
  },
  deleteRestaurant : async (obj, { _id }) => {
    const res = await Restaurant.deleteOne({_id}, (err) => {
      if(!err) return false
    })

    return typeof res === "object"
  }
}



export default {
  query,
  mutation
}
