const Todo = require("../models/Todo");
const User = require("../models/users");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const response = await Todo.create({
      title,
      description,
      createdBy: req.user._id,
    });
    res.status(201).json({
      data: response,
      message: "Created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.body;
  const { description } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { description, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json({
      data: todo,
      message: "Updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,   
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.find({ createdBy: req.user._id });
    if (!todo) {
      return res.status(404).json({
        message: "Task with given id not found",
      });
    }
    res.status(200).json({
      data: todo,
      message: `Todo data successfully fetched`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await Todo.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};





const getAggtodos = async (req, res) => {
  try {
    const todos = await User.aggregate([
      {
        $match: {
          _id: req.user._id,
        },
      },
      {
        $lookup: {
          from: "todos", 
          localField: "_id",
          foreignField: "createdBy", 
          as: "todos",
        },
      },

      { $unset: ["password", "createdAt", "updatedAt"] },

      {
        $addFields: {
          "todos.completion": "done",
        },
      },

    ]);

    return res.json({ message: todos });
  } catch (error) {
    
    return res.status(500).json({ error: "An error occurred" });
  }
};
  
module.exports = { createTodo, updateTodo, getTodo, deleteTodo,getAggtodos };
