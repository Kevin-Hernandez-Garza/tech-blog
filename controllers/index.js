const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');


// prefixing all routes with /api before the other endpoints 
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);


// error returned if incorrect resource is requested
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;