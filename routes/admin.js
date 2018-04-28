const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel');

// admin page
router.get('/', function (req, res) {
    res.send('admin page success');
});

// 제품 등록 폼 라우팅
router.get('/products/write', (req, res) => {
    res.render('admin/form')
});

module.exports = router;
