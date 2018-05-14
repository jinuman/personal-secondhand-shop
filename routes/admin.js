const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel');
const CommentsModel = require('../models/CommentsModel');

// admin page
router.get('/', function (req, res) {
    res.send('admin page success');
});

// 제품 등록 write(create) product
// Get(HTTP method) is used to request data from specified resource
router.get('/products/write', (req, res) => {
    res.render('admin/form', {product: ""})
    // edit에서 form의 value값 세팅을 위해 product를 사용하였기 때문에 여기서 빈 변수 넣어주어서 에러 방지
});
// DB 저장 = save
// Post(HTTP method) is used to send data to a server to create/update a resource
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
        // res.json(products);
        res.render('admin/products',
            {productList: products})    // view variable: parameter
            // pass a local variable to the view
    });
});

// 제품 상세 페이지
router.get('/products/detail/:productId', (req, res) => {
    // url에서 변수 값 받아올 땐 req.params.id
    ProductsModel.findOne({productId: req.params.productId}, (err, product) => {
        res.render('admin/productDetail', {productDetail: product});
    });
});

// 등록한 제품 수정하는 페이지
router.get('/products/edit/:productId', (req, res) => {
    // 기존 form에 value 추가해서 저장된 상태에서 변경할 수 있게 setting
    ProductsModel.findOne({productId: req.params.productId}, (err, product) => {
        res.render('admin/form', {product: product});
    });
});
// edit -> DB update
router.post('/products/edit/:productId', (req, res) => {
    // 스키마와 일치하게 수정할 변수들 setting
    let newValues = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };
    // update 파라미터 : 조회조건, 바뀔 값들(schema), callback
    ProductsModel.update({productId: req.params.productId}, {$set: newValues}, (err) => {
        // 수정 후 본래 보던 상세 페이지로 이동
        res.redirect('/admin/products/detail/' + req.params.productId);
    });
});

// 제품 삭제
router.get('/products/delete/:productId', (req, res) => {
    ProductsModel.remove({productId: req.params.productId}, (err) => {
        res.redirect('/admin/products')
    });
});

module.exports = router;
