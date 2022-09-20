const STATIC_TOKEN = process.env.STATIC_TOKEN
const verfiyAuth = (req,res,next)=>{
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    if (token !== STATIC_TOKEN) return res.status(401).send({ auth: false, message: 'Invalid Token' });
    next()
}
module.exports = verfiyAuth