// File: routes/categoryRouter.js
var express = require('express');
var router = express.Router();
var categoryModel = require("../models/category");


router.post("/add", async function (req, res) {
    try {
        const { cateName, parentID } = req.body;
        const newCate = { cateName, parentID };
        await categoryModel.create(newCate);
        res.status(200).json({ status: true, message: "Thành công" });
    } catch (e) {
        res.status(400).json({ status: false, message: "Lỗi thêm mới" });
    }
});



router.put("/update", async function (req, res) {
    try {
        const { id, cateName, parentID } = req.body;
        const item = await categoryModel.findById(id);
        if (item) {
            item.cateName = cateName ? cateName : item.cateName;
            item.parentID = parentID ? parentID : item.parentID;
            await item.save();
            res.status(200).json({ status: true, message: "Thành công" });
        } else {
            res.status(200).json({ status: false, message: "Không tìm thấy" });
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "Lỗi cập nhật" });
    }
});

/**
 * @swagger
 * /category/delete/{id}:
 * delete:
 * summary: Xóa danh mục theo ID
 * tags: [Categories]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID của danh mục cần xóa
 * responses:
 * 200:
 * description: Xóa thành công
 */
router.delete("/delete/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const item = await categoryModel.findById(id);
        if (item) {
            await categoryModel.findByIdAndDelete(id);
            res.status(200).json({ status: true, message: "Thành công" });
        } else {
            res.status(200).json({ status: false, message: "Không tìm thấy" });
        }
    } catch (e) {
        res.status(400).json({ status: false, message: "Lỗi xóa" });
    }
});

module.exports = router;