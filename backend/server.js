import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB when the server starts
app.listen(3000, async () => {
    // Connects to database
    await connectDB(); 
    console.log(`App listening on port: 3000`);
});

// Route to post products 
app.post('/api/products', async(req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) 
        return res.status(400).json({success: false, message: "Please provide all fields"});

    const newProduct = Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }
    catch(error) {
        console.log("Error in creating product", error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
    
});
