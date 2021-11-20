// the index.js file works to collect all of the API routes and package them up 


const router = require('express').Router();

const userRoutes = require('./user-routes');


// prefixing the api's with this endpoint inside quotes
router.use('/users', userRoutes);

module.exports = router;