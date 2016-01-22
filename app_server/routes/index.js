var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');



/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/cellar', ctrlMain.cellar);
router.get('/public-cellar', ctrlMain.publicCellar);
router.get('/about', ctrlMain.about);
router.get('/browse-cellars', ctrlMain.browseCellars);
router.get('/search', ctrlMain.searchForBeer);
router.get('/add', ctrlMain.addBeer);

module.exports = router;
