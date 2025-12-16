var express = require('express');
var router = express.Router();
const VacineModel = require('../models/vacine');

router.get('/list', async (req, res) => {
    try {
        const data = await VacineModel.find()
            .sort({ price: 1 })
            .limit(3);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        const result = await VacineModel.findByIdAndDelete(id);

        if (result) {
            res.json({ status: 1, message: "Xóa thành công", data: result });
        } else {
            res.json({ status: 0, message: "Không tìm thấy vaccine để xóa" });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi: " + error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { name, national, price } = req.body;
        const newVaccine = new VacineModel({ name, national, price });
        await newVaccine.save();
        res.json(newVaccine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;