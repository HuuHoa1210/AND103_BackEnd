const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const reviewSchema = new Schema({
    id: { type: ObjectId }, // khóa chính
    userID: { type: ObjectId, ref: "user" }, // khóa ngoại tham chiếu đến người dùng
    productID: { type: ObjectId, ref: "product" }, // khóa ngoại tham chiếu đến sản phẩm
    rating: { type: Number }, // đánh giá sao (ví dụ: từ 1 đến 5)
    description: { type: String }, // mô tả đánh giá
    createAt: { type: Date }, // ngày tạo đánh giá
});
module.exports = mongoose.models.review || mongoose.model('review', reviewSchema);