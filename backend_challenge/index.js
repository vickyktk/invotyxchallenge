require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const connectDB = require('./model/db')
connectDB()

const apiRoutes = require('./routes/Routes')
const verfiyAuth = require('./middlewares/middleware')

app.use("/api/v1", verfiyAuth, apiRoutes);

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});