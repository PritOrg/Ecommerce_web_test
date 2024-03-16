const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one order by ID
router.get('/:id', getOrder, (req, res) => {
    res.json(res.order);
});

// Create new order
router.post('/', async (req, res) => {
    const order = new Order({
        user: req.body.user,
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        status: req.body.status,
    });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one order
router.patch('/:id', getOrder, async (req, res) => {
    if (req.body.user != null) {
        res.order.user = req.body.user;
    }
    if (req.body.items != null) {
        res.order.items = req.body.items;
    }
    if (req.body.totalAmount != null) {
        res.order.totalAmount = req.body.totalAmount;
    }
    if (req.body.shippingAddress != null) {
        res.order.shippingAddress = req.body.shippingAddress;
    }
    if (req.body.paymentMethod != null) {
        res.order.paymentMethod = req.body.paymentMethod;
    }
    if (req.body.status != null) {
        res.order.status = req.body.status;
    }
    try {
        const updatedOrder = await res.order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one order
router.delete('/:id', getOrder, async (req, res) => {
    try {
        await res.order.remove();
        res.json({ message: 'Deleted Order' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.order = order;
    next();
}

module.exports = router;
