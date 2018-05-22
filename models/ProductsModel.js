const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// Create Fields
const ProductsSchema = new Schema({
    name: {                 // 제품 이름
        type: String,
        required: [true, "제품명을 입력해주세요."] // Validation Check
    },
    price: Number,          // 제품 가격
    description: String,    // 제품 설명
    created_at: {           // 작성한 날
        type: Date,
        default: Date.now()
    }
});

// virtual model: collection 에서 정의되지 않은 field 이지만 정의된 field 처럼 사용할 수 있게 하는 기술
// virtual 변수는 호출되면 실행하는 함수
// set 은 변수의 값을 바꾸거나 셋팅하면 호출
// getDate 변수를 호출하는 순간 년, 월, 일이 찍힌다.
ProductsSchema.virtual('getDate').get(function () {   // getDate 필드가 생긴다.
    let date = new Date(this.created_at);
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
});

// model: Collection name, field: primary key, startAt: 1부터 시작
// primary key will increment by 1 for each new record.
ProductsSchema.plugin(autoIncrement.plugin, {
    model: 'products',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('products', ProductsSchema);