var router = require('express').Router();

router.use('/user', require('./user'));
router.use('/category', require('./category'));
router.use('/property', require('./properties'));

module.exports = router;