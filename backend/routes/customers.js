const express = require("express");
const router = express();
const {getCustomer, getCustomers, createCustomer, updateCustomer, deleteCustomer} = require('../controllers/customerController');


// get Single Customer
router.get('/:id', getCustomer);

// get all the customers
router.get('/', getCustomers);

// create Customer
router.post('/',createCustomer );

//update customer
router.put('/:id', updateCustomer);

// delete customer
router.delete('/:id', deleteCustomer);


module.exports = router;


