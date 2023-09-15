import express from 'express';
import * as todoController from '../controllers/todo.js';

const router = express.Router();

router.get('/todos', todoController.getTodos);
router.post('/todo', todoController.postTodo);
router.patch('/todo/:id', todoController.patchTodo);

export default router;
