const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

require('dotenv').config();

const FAKESTORE_API_URL = process.env.FAKESTORE_API_URL;

router.get('/', async (req, res) => {
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log('Fetching from FakeStore API...');
    const { data } = await axios.get(FAKESTORE_API_URL);
    const items = data.map(p => ({
      productId: p.id.toString(),
      name: p.title,
      price: Number(p.price),
      image: p.image,
      category: p.category
    }));
    await Product.insertMany(items);
    return res.json(items);
  }

  const products = await Product.find();
  res.json(products);
});

module.exports = router;
