var express = require('express');
var router = express.Router();
var imageRouter = require("../models/image");

router.post('/upload', [upload.single('hinhAnh')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
                return res.json({ status: 0, link: "" });
            } else {
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({ status: 1, url: url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({ status: 0, link: "" });
        }
    });

router.post('/uploads', [upload.array('image', 9)],
    async (req, res, next) => {
        try {
            const { files } = req;
            if (!files) {
                return res.json({ status: 0, link: [] });
            } else {
                const url = [];
                for (const singleFile of files) {
                    url.push(`http://localhost:3000/images/${singleFile.filename}`);
                }
                return res.json({ status: 1, url: url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({ status: 0, link: [] });
        }
    });

module.exports = router;