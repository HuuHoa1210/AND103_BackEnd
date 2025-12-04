const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId }, // khóa chính
    username: { type: String}, // tên đăng nhập
    email: { type: String}, // email người dùng
    password: { type: String}, // mật khẩu
    phone: { type: String}, // số điện thoại
    role: { type: String}, // vai trò (admin, user)
    status: { type: String}, // trạng thái tài khoản (active, inactive)
});
module.exports = mongoose.models.user || mongoose.model('user', userSchema);