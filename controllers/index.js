const router = require('express').Router();

const apiRoutes = require('./api');


// prefixing all routes with /api before the other endpoints 
router.use('/api', apiRoutes);


// error returned if incorrect resource is requested
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;