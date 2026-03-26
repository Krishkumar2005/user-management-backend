// import type { Request, Response } from "express";
// import * as User from "../models/userModel.js";
// import type { UserInput } from "../types/user.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
import * as User from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// ✅ GET ALL
export const getUsers = asyncHandler(async (req, res) => {
    const { search, sort, order } = req.query;
    const users = await User.getAllUsers(search, sort, order || "asc");
    res.json(users);
});
// ✅ GET ONE
export const getUser = asyncHandler(async (req, res) => {
    const user = await User.getUserById(Number(req.params.id));
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
});
// ✅ CREATE
export const createUserController = asyncHandler(async (req, res) => {
    const body = req.body;
    if (!body.name || !body.email) {
        return res.status(400).json({ message: "Name & Email required" });
    }
    try {
        const user = await User.createUser(body);
        res.status(201).json(user);
    }
    catch (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
            return res.status(400).json({ message: "Email already exists" });
        }
        throw err;
    }
});
// ✅ UPDATE
export const updateUserController = asyncHandler(async (req, res) => {
    const body = req.body;
    const success = await User.updateUser(Number(req.params.id), body);
    if (!success)
        return res.status(404).json({ message: "User not found" });
    const user = await User.getUserById(Number(req.params.id));
    res.json(user);
});
// ✅ DELETE
export const deleteUserController = asyncHandler(async (req, res) => {
    const success = await User.deleteUser(Number(req.params.id));
    if (!success)
        return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
});
//# sourceMappingURL=userController.js.map