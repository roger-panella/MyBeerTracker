var express = require('express');
var router = express.Router();
var ctrlCellars = require('../controllers/cellars');
var ctrlBeers = require('../controllers/beers');

router.get('/cellars', ctrlCellars.listCellars);
router.post('/cellars', ctrlCellars.createCellars);
router.get('/cellars/:cellarid', ctrlCellars.listOneCellar);
router.put('/cellars/:cellarid', ctrlCellars.updateOneCellar);
router.delete('/cellars/:cellarid', ctrlCellars.deleteOneCellar);

router.post('/cellars/:cellarid/beers', ctrlBeers.createBeers);
router.get('/cellars/:cellarid/beers/:beerid', ctrlBeers.listOneBeer);
router.put('/cellars/:cellarid/beers/:beerid', ctrlBeers.updateOneBeer);
router.delete('/cellars/:cellarid/beers/:beerid', ctrlBeers.deleteOneBeer);

module.exports = router;
