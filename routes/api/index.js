const router = require('express').Router();
const pizzaRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;
