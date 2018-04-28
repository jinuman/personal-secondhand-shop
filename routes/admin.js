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
// DB 저장
router.post('/products/write', (req, res) => {
    let product = new ProductsModel({
        name: req.body.name,        // field: form_name
        price: req.body.price,
        description: req.body.description
    });
    product.save((err) => {
        res.redirect('#')
    });
});
module.exports = router;
