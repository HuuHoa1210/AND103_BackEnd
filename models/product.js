const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: { type: String }, // tên sản phẩm
    description: { type: String }, // mô tả sản phẩm
    price: { type: Number }, // giá sản phẩm
    quantity: { type: Number}, // số lượng sản phẩm
    status: { type: Boolean},
    createAt: { type: Date}, // ngày tạo
    updateAt: { type: Date}, // ngày cập nhật
    cateID: { type: ObjectId, ref: "category" }  // khóa ngoại tham chiếu đến danh mục sản phẩm
});
module.exports = mongoose.models.product || mongoose.model('product', productSchema);