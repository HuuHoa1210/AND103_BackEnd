const mongoose = require('mongoose');
const express = require('express');
const app = express();

// 1. Lấy cấu hình từ môi trường (Render sẽ tự điền vào đây)
const PORT = process.env.PORT || 3000; 
const MONGO_URI = process.env.MONGO_URI; // Biến này ta sẽ cài đặt trên web Render sau

async function connectDB() {
  try {
    // 2. Kết nối
    await mongoose.connect(MONGO_URI);
    console.log("✅ Đã kết nối MongoDB!");
  } catch (error) {
    console.error("❌ Lỗi kết nối:", error);
  }
}

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World! Server is running.');
});

// 3. Lắng nghe Port động
app.listen(PORT, () => {
  console.log(`Server đang chạy ở port ${PORT}`);
});