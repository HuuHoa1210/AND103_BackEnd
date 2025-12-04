const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); 
const mongoose = require('mongoose');

// Import Routers
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter'); // <--- Mới thêm

const app = express();
const port = 3000;

// Kết nối MongoDB (Ví dụ)
mongoose.connect('mongodb://localhost:27017/my_database')
  .then(() => console.log('Connected to MongoDB'));

app.use(express.json());

// Load file Swagger 15 API
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Định tuyến
app.use('/product', productRouter);   // Các API sản phẩm
app.use('/category', categoryRouter); // Các API danh mục
app.use('/user', userRouter);         // Các API người dùng (Mới)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger UI at http://localhost:${port}/api-docs`);
});