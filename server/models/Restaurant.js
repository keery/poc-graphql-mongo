import { Schema, model } from 'mongoose'

const addressSchema = new Schema({
    building : Number,
    street   : String,
    zipcode  : String
})

const gradeSchema = new Schema({
    grade : String,
    score : Number
})

const restaurantSchema = new Schema({
    name    : String,
    borough : String,
    cuisine : String,
    address : addressSchema,
    gardes  : [ gradeSchema ]
})

const Restaurant = model('Restaurant', restaurantSchema)

export default Restaurant