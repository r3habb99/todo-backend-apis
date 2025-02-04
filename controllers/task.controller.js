const logger = require("../utils/logger.util");
const Task = require("../models/task.model");
const sendResponse = require("../utils/responses.util");

// Create Task
const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, status, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return sendResponse(
        res,
        400,
        false,
        "All required fields must be provided"
      );
    }

    const newTask = new Task({
      title,
      description,
      status: status || "pending",
      dueDate,
      userId,
    });
    await newTask.save();

    logger.info("Task created successfully");
    sendResponse(res, 201, true, "Task created successfully", newTask);
  } catch (error) {
    logger.error(error.message);
    sendResponse(res, 500, false, error.message);
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      { title, description, status },
      { new: true }
    );

    if (!updatedTask)
      return sendResponse(res, 404, false, "Task not found or unauthorized");

    logger.info("Task updated successfully");
    sendResponse(res, 200, true, "Task updated successfully", updatedTask);
  } catch (error) {
    logger.error(error.message);
    sendResponse(res, 500, false, error.message);
  }
};

// Get All Tasks for Logged-in User
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId });

    logger.info("Tasks retrieved successfully");
    sendResponse(res, 200, true, "Tasks retrieved successfully", tasks);
  } catch (error) {
    logger.error(error.message);
    sendResponse(res, 500, false, error.message);
  }
};

// Get Task By ID
const getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, userId });

    if (!task)
      return sendResponse(res, 404, false, "Task not found or unauthorized");

    logger.info("Task retrieved successfully");
    sendResponse(res, 200, true, "Task retrieved successfully", task);
  } catch (error) {
    logger.error(error.message);
    sendResponse(res, 500, false, error.message);
  }
};

// Delete Task By ID
const deleteTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({ _id: id, userId });
    if (!deletedTask)
      return sendResponse(res, 404, false, "Task not found or unauthorized");

    logger.info("Task deleted successfully");
    sendResponse(res, 200, true, "Task deleted successfully");
  } catch (error) {
    logger.error(error.message);
    sendResponse(res, 500, false, error.message);
  }
};

// Delete All Tasks for Logged-in User
const deleteTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    await Task.deleteMany({ userId });

    logger.info("All tasks deleted successfully");
    sendResponse(res, 200, true, "All tasks deleted successfully");
  } catch (error) {
    logger.error(error.message);
    sendResponse(res, 500, false, error.message);
  }
};

// Update Task Status
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

    if (!updatedTask)
      return sendResponse(res, 404, false, "Task not found or unauthorized");

    logger.info("Task status updated successfully");
    sendResponse(
      res,
      200,
      true,
      "Task status updated successfully",
      updatedTask
    );
  } catch (error) {
    logger.error(error.message);
    sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  createTask,
  updateTask,
  getTasks,
  getTaskById,
  deleteTaskById,
  deleteTasks,
  taskStatusUpdate,
};
