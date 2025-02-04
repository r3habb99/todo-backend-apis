const logger = require("../utils/logger.util");
const Task = require("../models/task.model");
const User = require("../models/user.model");

// Create Task
const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, status, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newTask = new Task({ title, description, status: status || "pending", dueDate, userId });
    await newTask.save();

    logger.info("Task created successfully");
    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId }, // Ensure user only updates their own task
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found or unauthorized" });

    logger.info("Task updated successfully");
    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get All Tasks for Logged-in User
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId });

    logger.info("Tasks retrieved successfully");
    res.status(200).json({ tasks });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get Task By ID (for logged-in user)
const getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, userId });

    if (!task) return res.status(404).json({ message: "Task not found or unauthorized" });

    logger.info("Task retrieved successfully");
    res.status(200).json({ task });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete Task By ID (for logged-in user)
const deleteTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({ _id: id, userId });
    if (!deletedTask) return res.status(404).json({ message: "Task not found or unauthorized" });

    logger.info("Task deleted successfully");
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete All Tasks for Logged-in User
const deleteTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    await Task.deleteMany({ userId });

    logger.info("All tasks deleted successfully");
    res.status(200).json({ message: "All tasks deleted successfully" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update Task Status (for logged-in user)
const taskStatusUpdate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId }, 
      { status }, 
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found or unauthorized" });

    logger.info("Task status updated successfully");
    res.status(200).json({ message: "Task status updated successfully", updatedTask });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  updateTask,
  getTasks,
  getTaskById,
  deleteTaskById,
  deleteTasks,
  taskStatusUpdate
};