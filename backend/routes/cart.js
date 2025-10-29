const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find({ userId: 'demo-user' });
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    res.json({ items, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { productId, name, price, qty, image } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId required' });
    let item = await CartItem.findOne({ userId: 'demo-user', productId });
    if (item) { item.qty += qty || 1; await item.save(); }
    else {
      item = new CartItem({ userId: 'demo-user', productId, name, price, qty: qty||1, image: image||null });
      await item.save();
    }
    res.json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.patch('/:id', async (req, res) => {
  try {
    const { qty } = req.body;
    const item = await CartItem.findOne({ _id: req.params.id, userId: 'demo-user' });
    if (!item) return res.status(404).json({ error: 'not found' });
    item.qty = qty;
    await item.save();
    const items = await CartItem.find({ userId: 'demo-user' });
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    res.json({ items, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await CartItem.deleteOne({ _id: req.params.id, userId: 'demo-user' });
    const items = await CartItem.find({ userId: 'demo-user' });
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    res.json({ items, total });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/checkout', async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;
    const total = (cartItems||[]).reduce((s, it) => s + (it.price||0)*(it.qty||0), 0);
    const receipt = { id: 'rcpt_'+Date.now(), name: name||'Guest', email: email||null, items: cartItems, total, timestamp: new Date().toISOString() };
    await CartItem.deleteMany({ userId: 'demo-user' });
    res.json({ receipt });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
