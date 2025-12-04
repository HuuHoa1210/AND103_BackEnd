const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderDetailSchema = new Schema({
    id: { type: ObjectId }, // khóa chính
    orderID: { type: ObjectId, ref: "order" }, // khóa ngoại tham chiếu đến đơn hàng
    productID: { type: ObjectId, ref: "product" }, // khóa ngoại tham chiếu đến sản phẩm
    quantity: { type: Number }, // số lượng sản phẩm trong đơn hàng
    price: { type: Number }, // giá sản phẩm tại thời điểm đặt hàng
});
module.exports = mongoose.models.orderdetail || mongoose.model('orderdetail', orderDetailSchema);