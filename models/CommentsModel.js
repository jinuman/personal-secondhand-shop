const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// Create Fields
const CommentsSchema = new Schema({
        content: String,
        created_at: {
            type: Date,
            default: Date.now()
        },
        product_id: Number  // for searching
    }
);

// field: primary key
// primary key will increment by 1 for each new record.
CommentsSchema.plugin(autoIncrement.plugin, {
    model: 'comments',
    field: 'id',
    startAt: 1
});

module.exports = mongoose.model('comments', CommentsSchema);