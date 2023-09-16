import todoModel from '../models/todo.model.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find({ removed: false }, { __v: 0 });
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

export const patchTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed, removed } = req.body;

  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(id, { title, completed, removed }, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
