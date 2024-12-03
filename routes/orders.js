const express = require('express');
const router = express.Router();
const validate = require('../helper/validate');
const ordersController = require('../controllers/orders');

router.get('/', ordersController.getOrders);

router.get('/:id', ordersController.getOrder);

router.post('/',validate.saveOrder, ordersController.createOrder);

router.put('/:id', validate.saveOrder ,ordersController.updateOrder);

router.delete('/:id', ordersController.deleteOrder);

module.exports = router;