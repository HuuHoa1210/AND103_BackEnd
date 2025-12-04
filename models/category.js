const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const categorySchema = new Schema({
    id: { type: ObjectId }, // khóa chính
    cateName: {type: String},
    description: { type: String }, // mô tả
    parentID: { type: ObjectId, ref:"category" }
});
module.exports = mongoose.models.category || mongoose.model('category', categorySchema);
// category ---> categories 

