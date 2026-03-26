// import type { Request, Response } from "express";
// import * as User from "../models/userModel.js";
// import type { UserInput } from "../types/user.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// export const getUsers = asyncHandler(async (req: Request, res: Response) => {
//   const { search, sort, order } = req.query;
//   const users = User.getAllUsers(
//     search as string | undefined,
//     sort as string | undefined as any,
//     (order as "asc"|"desc") || "asc"
//   );
//   res.json(users);
// });

// export const getUser = asyncHandler(async (req: Request, res: Response) => {
//   const user = User.getUserById(Number(req.params.id));
//   if (!user) return res.status(404).json({ message: "User not found" });
//   res.json(user);
// });

// export const createUserController = asyncHandler(async (req: Request, res: Response) => {
//   const body = req.body as UserInput;
//   if (!body.name || !body.email) return res.status(400).json({ message: "Name & Email required" });

//   try {
//     const user = User.createUser(body);
//     res.status(201).json(user);
//   } catch (err: any) {
//     if (err.message.includes("UNIQUE constraint failed")) {
//       return res.status(400).json({ message: "Email already exists" });
//     }
//     throw err;
//   }
// });

// export const updateUserController = asyncHandler(async (req: Request, res: Response) => {
//   const body = req.body as UserInput;
//   const success = User.updateUser(Number(req.params.id), body);
//   if (!success) return res.status(404).json({ message: "User not found" });
//   const user = User.getUserById(Number(req.params.id));
//   res.json(user);
// });

// export const deleteUserController = asyncHandler(async (req: Request, res: Response) => {
//   const success = User.deleteUser(Number(req.params.id));
//   if (!success) return res.status(404).json({ message: "User not found" });
//   res.json({ message: "User deleted successfully" });
// });









import type { Request, Response } from "express";
import * as User from "../models/userModel.js";
import type { UserInput } from "../types/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// ✅ GET ALL
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const { search, sort, order } = req.query;

  const users = await User.getAllUsers(
    search as string | undefined,
    sort as any,
    (order as "asc" | "desc") || "asc"
  );

  res.json(users);
});


// ✅ GET ONE
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.getUserById(Number(req.params.id));

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});


// ✅ CREATE
export const createUserController = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UserInput;

  if (!body.name || !body.email) {
    return res.status(400).json({ message: "Name & Email required" });
  }

  try {
    const user = await User.createUser(body);
    res.status(201).json(user);
  } catch (err: any) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({ message: "Email already exists" });
    }
    throw err;
  }
});


// ✅ UPDATE
export const updateUserController = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UserInput;

  const success = await User.updateUser(Number(req.params.id), body);

  if (!success) return res.status(404).json({ message: "User not found" });

  const user = await User.getUserById(Number(req.params.id));

  res.json(user);
});


// ✅ DELETE
export const deleteUserController = asyncHandler(async (req: Request, res: Response) => {
  const success = await User.deleteUser(Number(req.params.id));

  if (!success) return res.status(404).json({ message: "User not found" });

  res.json({ message: "User deleted successfully" });
});