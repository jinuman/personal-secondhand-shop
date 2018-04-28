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
        res.redirect('/admin/products')  // 작성하면 목록으로 이동
    });
});

// 제품 목록
router.get('/products', (req, res) => {
    ProductsModel.find((err, products) => {
        res.render('admin/products',
            {allProducts: products})    // view variable: DB model
            // pass a local variable to the view
    });
});



module.exports = router;
