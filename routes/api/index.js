var router = require('express').Router();

router.use('/user', require('./user'));
router.use('/category', require('./category'));
router.use('/property', require('./properties'));
router.use('/upload', require('./upload'));
router.use('/boost', require('./boost'));

module.exports = router;