const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    images: [{ type: String }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
