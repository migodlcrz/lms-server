import User from "../../models/userModel";
import { Request, Response } from "express";

export const getToDoList = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving to-do list", error });
  }
};

export const addToDoList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, date } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTodo = { title, date };
    user.todos.push(newTodo);
    await user.save();

    res.status(201).json({ message: "To-do item added", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Error adding to-do item", error });
  }
};

export const deleteToDoList = async (req: Request, res: Response) => {
  const { id, todoId } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { todos: { _id: todoId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or to-do item not found" });
    }

    res.status(200).json({ message: "To-do item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting to-do item", error });
  }
};
