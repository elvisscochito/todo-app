import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db.js';
import todoRoutes from './routes/todo.js';

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

app.set("port", process.env.PORT || 3000);
const PORT = app.get("port");

app.use('/', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
