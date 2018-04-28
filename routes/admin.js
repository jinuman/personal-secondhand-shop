const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel');

// admin page
router.get('/', function (req, res) {
    res.send('admin page success');
});

// 제품 등록 create product
router.get('/products/write', (req, res) => {
    res.render('admin/form')
});
// DB 저장 saving
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

// 제품 목록 product list
router.get('/products', (req, res) => {
    ProductsModel.find((err, products) => {
        res.render('admin/products',
            {productList: products})    // view variable: DB model
            // pass a local variable to the view
    });
});

// 제품 상세 페이지
router.get('/products/detail/:productId', (req, res) => {
    // url에서 변수 값 받아올 땐 req.params.id
    ProductsModel.findOne({productId: req.params.productId}, (err, product) => {
        res.render('admin/productDetail', {productDetail: product})
    });
});




module.exports = router;
