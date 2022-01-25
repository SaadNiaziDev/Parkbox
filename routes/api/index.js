var router = require('express').Router();

router.use('/user', require('./user'));
// router.use('/vehicle',require('./vehicle'));
// router.use('/floor',require('./floor'));
// router.use('/booking', require('./booking'));

module.exports = router;