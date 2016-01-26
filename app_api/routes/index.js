var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlBeers = require('../controllers/beers');

router.get('/users', ctrlUsers.listUsers);
// router.post('/cellars', ctrlUsers.createCellars);
router.get('/users/:userid', ctrlUsers.listOneUser);
router.put('/users/:userid', ctrlUsers.updateOneUser);
router.delete('/users/:userid', ctrlUsers.deleteOneUser);

router.post('/users/:userid/beers', ctrlBeers.createBeers);
router.get('/users/:userid/beers/:beerid', ctrlBeers.listOneBeer);
router.put('/users/:userid/beers/:beerid', ctrlBeers.updateOneBeer);
router.delete('/users/:userid/beers/:beerid', ctrlBeers.deleteOneBeer);

module.exports = router;
