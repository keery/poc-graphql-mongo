import { Schema, model } from 'mongoose'

const addressSchema = new Schema({
    building : {
        type : Number,
        min  : 1
    },
    street   : String,
    zipcode  : String
})

const gradeSchema = new Schema({
    grade : String,
    score : Number
})

const restaurantSchema = new Schema({
    name    : { 
        type     : String,
        trim     : true,
        required : true
    },
    borough : String,
    cuisine : String,
    address : addressSchema,
    grades  : [ gradeSchema ]
})

const Restaurant = model('Restaurant', restaurantSchema)

export default Restaurant