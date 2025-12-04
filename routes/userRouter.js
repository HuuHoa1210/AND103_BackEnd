// File: routes/userRouter.js
var express = require('express');
var router = express.Router();
var userModel = require("../models/user"); // Đường dẫn tới model của bạn

// 1. Đăng ký (Create)
router.post("/register", async function(req, res) {
    try {
        const { username, email, password, phone, role, status } = req.body;
        // Ở đây nên có bước mã hóa mật khẩu (bcrypt) trước khi lưu
        const newUser = { username, email, password, phone, role, status };
        await userModel.create(newUser);
        res.status(200).json({ status: true, message: "Đăng ký thành công" });
    } catch (e) {
        res.status(400).json({ status: false, message: "Lỗi đăng ký: " + e.message });
    }
});

// 2. Đăng nhập
router.post("/login", async function(req, res) {
    try {
        const { username, password } = req.body;
        // Tìm user theo username và password
        const user = await userModel.findOne({ username: username, password: password });
        if (user) {
            // Thực tế sẽ trả về JWT token ở đây
            res.status(200).json({ status: true, message: "Đăng nhập thành công", data: user });
        } else {
            res.status(401).json({ status: false, message: "Sai tên đăng nhập hoặc mật khẩu" });
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "Lỗi hệ thống" });
    }
});

// 3. Lấy danh sách users (Read All)
router.get("/", async function(req, res) {
    try {
        const list = await userModel.find();
        res.status(200).json({ status: true, message: "Thành công", data: list });
    } catch (e) {
        res.status(400).json({ status: false, message: "Lỗi: " + e.message });
    }
});

// 4. Lấy chi tiết user (Read One)
router.get("/:id", async function(req, res) {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (user) {
            res.status(200).json({ status: true, message: "Thành công", data: user });
        } else {
            res.status(404).json({ status: false, message: "Không tìm thấy user" });
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "Lỗi ID không hợp lệ" });
    }
});

// 5. Cập nhật user (Update)
router.put("/:id", async function(req, res) {
    try {
        const { id } = req.params;
        const { username, email, password, phone, role, status } = req.body;
        
        const user = await userModel.findById(id);
        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;
            user.password = password || user.password;
            user.phone = phone || user.phone;
            user.role = role || user.role;
            user.status = status || user.status;
            
            await user.save();
            res.status(200).json({ status: true, message: "Cập nhật thành công" });
        } else {
            res.status(404).json({ status: false, message: "Không tìm thấy user" });
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "Lỗi cập nhật" });
    }
});

// 6. Xóa user (Delete)
router.delete("/:id", async function(req, res) {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "Xóa thành công" });
    } catch (e) {
        res.status(400).json({ status: false, message: "Lỗi xóa dữ liệu" });
    }
});

module.exports = router;