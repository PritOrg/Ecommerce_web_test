const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const url = 'mongodb+srv://PritVasani:PritVasani@cluster1.b6zbc02.mongodb.net/Ecommerce'

mongoose.connect(url)
    .then(
        () => {
            console.log('Connected to MongoDB')

            const app = express();
            app.use(bodyParser.json());
            app.use(cors());
            const userRoutes = require('./routers/user.router');
            const productRoutes = require('./routers/product.router');
            const orderRoutes = require('./routers/order.router');
            const reviewRoutes = require('./routers/review.router');

            app.use('/api/users', userRoutes);
            app.use('/api/products', productRoutes);
            app.use('/api/orders', orderRoutes);
            app.use('/api/reviews', reviewRoutes);

            app.listen(1969, (res) => {
                console.log(`Server is running on http://localhost:1969`);
            })
        }
    )
    .catch((err) => console.error('Error connecting to MongoDB:', err))