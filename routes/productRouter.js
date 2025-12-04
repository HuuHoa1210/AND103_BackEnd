var express = require('express');
var router = express.Router();
var productModel = require("../models/product");
var upload = require("../utils/upload");
var createNotificationTemplate = require("../utils/emailTemplate");
var sendMail = require("../utils/mail");



// Thêm mới sản phẩm 
// localhost:3001/product/add-product
router.post("/add-product", async function (req, res) {
    try {
        // nhận, lấy dữ liệu
        const { name, description, price, quantity, status, cateID } = req.body;
        const updateAt = new Date();
        const createAt = new Date();
        // tạo object để lưu vào db
        const newProduct = { name, description, price, quantity, status, cateID, createAt, updateAt };
        // lưu vào db
        await productModel.create(newProduct);
        res.status(200).json({ status: true, message: "Thêm sản phẩm thành công" });
    } catch (e) {
        res.status(400).json({ status: false, message: "Không thành công" });
    }
});

// cap nhat san pham
router.put("/update-product", async function (req, res) {
    const { id, name, description, price, quantity, status, cateID } = req.body;
    const item = await productModel.findById(id);
    if (item) {
        item.name = name ? name : item.name;
        item.description = description ? description : item.description;
        item.price = price ? price : item.price;
        item.quantity = quantity ? quantity : item.quantity;
        item.status = status ? status : item.status;
        item.cateID = cateID ? cateID : item.cateID;
        item.updateAt = new Date();
        await item.save();

        res.status(200).json({ status: true, message: "Cập nhật thành công" });
    } else {
        res.status(200).json({ status: false, message: "Không tìm thấy" });
    }
});
// Xoa
router.delete("/delete-product", async function (req, res) {
    const { id } = req.query;
    const item = await productModel.findById(id);

    if (item) {
        await productModel.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "Xóa thành công" });

    } else {
        res.status(200).json({ status: false, message: "Không tìm thấy" });
    }
});

// lấy danh sách, điều kiện
router.get("/all", async function (req, res) {
    const list = await productModel.find();
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// Lấy danh sách với những thuộc tính được yêu cầu
router.get("/all1", async function (req, res) {
    const list = await productModel.find({}, "name description price quantity");
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// Lấy danh sách tất cả sản phẩm có giá >100000
router.get("/all2", async function (req, res) {
    const list = await productModel.find({ $gt: 100000 });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// Lấy danh sách tất cả sản phẩm có giá từ 100000 đến 200000
router.get("/all3", async function (req, res) {
    const list = await productModel.find({ price: { $gte: 100000, $lte: 200000 } });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// Lấy danh sách tất cả sản phẩm có giá từ 100000 và có số lượng > 10
router.get("/all4", async function (req, res) {
    const list = await productModel.find({ $and: [{ price: { $gt: 100000 } }, { quantity: { $gt: 10 } }] });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});


// 1. Lọc danh sách sản phẩm có giá lớn hơn 50,000.
router.get("/cau1", async function (req, res) {
    const list = await productModel.find({ price: { $gt: 50000 } })
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 2. Lọc danh sách sản phẩm có số lượng nhỏ hơn 10.
router.get("/cau2", async function (req, res) {
    const list = await productModel.find({ quantity: { $lt: 10 } })
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 3. Tìm sản phẩm có name chứa từ khóa “socola”.
router.get("/cau3", async function (req, res) {
    const list = await productModel.find({ name: { $regex: "socola", $options: "i" } })
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 4. Sắp xếp sản phẩm theo giá tăng dần.
router.get("/cau4", async function (req, res) {
    const list = await productModel.find().sort({ price: 1 });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 5. Lấy 3 sản phẩm có giá cao nhất
router.get("/cau5", async function (req, res) {
    const list = await productModel.find().sort({ price: -1 }).limit(3);
    res.status(200).json({ status: true, message: "Thành công", data: list });
});
// 6. Lấy 5 sản phẩm có số lượng nhiều nhất
router.get("/cau6", async function (req, res) {
    const list = await productModel.find().sort({ quantity: -1 }).limit(5);
    res.status(200).json({ status: true, message: "Thành công", data: list });
});
// 7. Sản phẩm được tạo trong ngày hôm nay
router.get("/cau7", async function (req, res) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const list = await productModel.find({ createAt: { $gte: startOfToday, $lte: endOfToday } })
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 8.Lọc sản phẩm có giá trong khoảng 20,000 – 100,000
router.get("/cau8", async function (req, res) {
    const list = await productModel.find({ price: { $gte: 20000, $lte: 100000 } });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});
// 9.Tên bắt đầu bằng chữ "Bánh"
router.get("/cau9", async function (req, res) {
    const list = await productModel.find({ name: { $regex: "^Bánh", $options: "i" } })
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 10. Nhiều điều kiện: price < x và quantity > y
router.get("/cau10/:price/:quantity", async function (req, res) { // Thêm :price và :quantity
    const price1 = req.params.price;
    const quantity1 = req.params.quantity;
    const list = await productModel.find({ price: { $lt: price1 }, quantity: { $gt: quantity1 } });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 11. Lấy danh sách sản phẩm có price < 100,000 và status = true,
//     đồng thời sắp xếp theo price giảm dần
router.get("/cau11", async function (req, res) {
    const list = await productModel.find({price: { $lt: 100000 },status: true}).sort({ price: -1 });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 12. Lấy sản phẩm có quantity trong khoảng 10–30 và name chứa từ "bánh"
router.get("/cau12", async function (req, res) {
    const list = await productModel.find({quantity: { $gte: 10, $lte: 30 },name: { $regex: "bánh", $options: "i" }});
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 13. Tìm sản phẩm theo nhiều điều kiện: name chứa “kem” hoặc “socola”, và giá > 200,000.
router.get("/cau13", async function (req, res) {
    const list = await productModel.find({price: {$gt: 20000},name: {$regex: "kem|socola",$options: "i"},});
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 14. Lấy danh sách sản phẩm có quantity > 20, sắp xếp theo quantity giảm dần, sau đó theo price tăng dần.
router.get("/cau14", async function(req,res){
    const list = await productModel.find({quantity: {$gt: 20}})
    .sort({quantity: -1, price: 1});
    res.status(200).json({ status: true, message: "Thành công", data: list });
    
});

// 15.Lấy danh sách sản phẩm theo cateID nhưng loại bỏ các sản phẩm có status = false
router.get("/cau15/:cateID", async function(req,res){
    const cateID = req.params.cateID  
    const list = await productModel.find({
        cateID: cateID,
        status: {$ne: false}
    });
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 16. Tìm sản phẩm có price thấp nhất trong toàn bộ danh sách.
router.get("/cau16", async function(req,res){
    const cheapestProduct = await productModel.findOne().sort({ price: 1 });

        if (cheapestProduct) {
            const minPrice = cheapestProduct.price;
            const list = await productModel.find({ price: minPrice });

            res.status(200).json({ status: true, message: "Thành công", data: list });
        } else {
            res.status(200).json({ status: false, message: "Không có dữ liệu sản phẩm", data: [] });
        }
});

// 17. Tìm 5 sản phẩm có price cao nhất nhưng quantity phải lớn hơn 10.
router.get("/cau17", async function(req,res){
    const list = await productModel.find({quantity: {$gt: 10}})
    .sort({price: -1})
    .limit(5);
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 18. Tìm tất cả sản phẩm có name bắt đầu bằng chữ “Bánh” và description chứa từ “vani”.
router.get("/cau18", async function(req,res){
    const list = await productModel.find({name: {$regex:"^Bánh", $options:"i"}, description: {$regex: "vani",$options: "i"}});
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 19.Lọc danh sách sản phẩm tạo trong vòng 7 ngày trở lại đây dựa vào createAt.
router.get("/cau19", async function(req,res){
    const date = new Date();
    date.setDate(date.getDate() - 7);

    const list = await productModel.find({createAt: {$gte: date}});
    res.status(200).json({ status: true, message: "Thành công", data: list });
});

// 20.Lấy danh sách sản phẩm theo cateID, và chỉ trả về các field: name, price, quantity.
router.get("/cau20/:cateID", async function(req,res){
    const cateID = req.params.cateID;
    const list = await productModel.find({cateID: cateID},'name price quantity');
    res.status(200).json({ status: true, message: "Thành công", data: list });
})

// 21. Tìm sản phẩm có price từ 20,000 đến 200,000 và name KHÔNG chứa chữ “socola”.
router.get("/cau21", async function(req,res){
    const list = await productModel.find({price: {$gte: 20000, $lte: 200000}, name: {$not: {$regex: "socola",$options: "i"}}});
    res.status(200).json({ status: true, message: "Thành công", data: list });
})

router.post('/upload', [upload.single('hinhAnh')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : "" }); 
            } else {
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });


    router.post("/send-mail", async function(req, res, next){
  try{
    const {to, subject, content} = req.body;

    const mailOptions = {
      from: "hoaro57@gmail.com",
      to: to,
      subject: subject,
      html: createNotificationTemplate(to, content, "https://gemini.google.com/")
    };
    await sendMail.transporter.sendMail(mailOptions);
    res.json({ status: 1, message: "Gửi mail thành công"});
  }catch(err){
    console.log("Lỗi gửi mail: ", err); 
    res.json({ status: 0, message: "Gửi mail thất bại"});
  }
});

module.exports = router;