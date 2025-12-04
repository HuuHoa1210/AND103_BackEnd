const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    id: { type: ObjectId }, // khóa chính
    userID: { type: ObjectId, ref: "user" }, // khóa ngoại tham chiếu đến người dùng
    fullname: { type: String }, // tên người nhận
    address: { type: String }, // địa chỉ giao hàng
    status: { type: String }, // trạng thái đơn hàng (ví dụ: pending, shipped, delivered)
    paymentMethod: { type: String }, // phương thức thanh toán
    createAt: { type: Date }, // ngày tạo đơn hàng
});
module.exports = mongoose.models.order || mongoose.model('order', orderSchema);