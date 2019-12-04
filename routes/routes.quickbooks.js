var express = require('express');
var router = express.Router();
var quickbooksController = require('../controllers/controller.quickbooks')
// Home page route.
router.get('/', quickbooksController.getCustomerList)

// About page route.
router.get('/accounts', quickbooksController.getAccounts);
router.get('/cashrunaway',quickbooksController.getCashRunaway);


module.exports = router;