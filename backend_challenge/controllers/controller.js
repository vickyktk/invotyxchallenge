const axios = require('axios')
require('dotenv').config();

const API_KEY = process.env.OPEN_WEATHER_API_KEY
const stations = require('../model/schema')
const cron = require('node-cron')
const express = require('express')
const app = express()

cron.schedule('0 0 */1 * * *', async function() {
    getAndUpdate()
})

const fetchIndigoData = async (req,res)=>{
    getAndUpdate();
    res.status(200).json({"message":"Data Updated Successfully"})
}

const getAndUpdate= async()=>{
    try {
        let config = {
            method: 'get',
            url: 'https://kiosks.bicycletransit.workers.dev/phl'
        }
        let response = await axios(config)
        const features = response.data.features
        let featuresArr = []
        features.forEach((feature)=>{
            const properties = feature.properties
            const stationId = properties.id
            featuresArr.push({stationId, properties:JSON.stringify(properties)})
        })
        let result = await stations.insertMany(featuresArr)
        return result
    } catch (error) {
        console.log(err)
        process.exit(1)
    }
    
}


const getAllStationsData = async(req,res)=>{
    
    let allStations = await stations.find({})
    if(null == allStations) {
        res.status(404).json({"error":"Could find data"})
        return
    }
    const config = {
        method: 'get',
        url:`https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=${API_KEY}`
    }
    const response = await axios(config)
    let jsonResp = {
        at:new Date(),
        stations:allStations,
        weather:response.data.weather
    }
    res.status(200).json(jsonResp)
}

const getSingleStationData = async(req,res)=>{
    const stationId = req.params.id
    let stationData = await stations.findOne({stationId:stationId})
    if(null == stationData) {
        res.status(404).json({"error":"Could find data against provided station ID"})
        return
    }
    const properties = JSON.parse(stationData.properties)
    const addressZipCode = properties.addressZipCode
    const config = {
        method: 'get',
        url:`https://api.openweathermap.org/data/2.5/weather?zip=${addressZipCode}&appid=${API_KEY}`
    }
    const response = await axios(config)
    let jsonResp = {
        at:new Date(),
        station:properties,
        weather:response.data.weather
    }
    res.status(200).json(jsonResp) 
}

module.exports = {
    fetchIndigoData,
    getAllStationsData,
    getSingleStationData
}