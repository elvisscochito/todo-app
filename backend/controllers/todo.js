import todoModel from '../models/todo.model.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find({}, { __v: 0 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const postTodo = async (req, res) => {
  try {
    const newTodo = await todoModel.create(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
