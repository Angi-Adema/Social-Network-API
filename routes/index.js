const router = require('express').Router();
const apiRoutes = require('./api');

//Adds prefix of '/api' to all of the api routes.
router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
