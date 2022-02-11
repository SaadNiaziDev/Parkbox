var router = require('express').Router();

router.use('/user', require('./user'));
router.use('/category', require('./category'));
router.use('/property', require('./properties'));
router.use('/upload', require('./upload'));

module.exports = router;