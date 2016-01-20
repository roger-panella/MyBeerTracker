var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');



/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/cellar', ctrlMain.cellar);
router.get('/public_cellar', ctrlMain.publicCellar);
router.get('/about', ctrlMain.about);
router.get('/browse_cellars', ctrlMain.browseCellars);

module.exports = router;
