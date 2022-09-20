const express = require('express')
const router = express.Router()


const  { fetchIndigoData, getAllStationsData, getSingleStationData } = require('../controllers/controller')
router.route('/indego-data-fetch-and-store-it-db').get(fetchIndigoData)
router.route('/stations').get(getAllStationsData)
router.route('/stations/:id').get(getSingleStationData)

module.exports = router