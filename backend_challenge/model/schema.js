let mongoose=require('mongoose')
require('dotenv').config();

let url=process.env.mongoAtlas
// let url=process.env.mongoLocal

const stationsSchema = mongoose.Schema( {
    stationId:{
        type:String,
        required:[true, "Please add a station ID"],
        unique:true,
        trim:true,
        maxLength:[10, "The Station Id should not be greater than 10 chars"]
    },
    properties:{
        type:String,
        required:true
    }
} )

module.exports = mongoose.model('Stations', stationsSchema)