require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const connectDB = require('./model/db')
connectDB()
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('./swagger.json');

const apiRoutes = require('./routes/Routes')
const verfiyAuth = require('./middlewares/middleware')

app.use("/api/v1", verfiyAuth, apiRoutes);
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});