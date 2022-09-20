
const mongoose = require('mongoose')
const uri = process.env.MONGO_URI;

const connectDB = async()=>{
    try {
        const connObj = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Mongo DB connected ${connObj.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
module.exports = connectDB