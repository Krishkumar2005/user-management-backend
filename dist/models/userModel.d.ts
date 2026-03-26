import type { User, UserInput } from "../types/user.js";
export declare const getAllUsers: (search?: string, sort?: keyof User, order?: "asc" | "desc") => Promise<User[]>;
export declare const getUserById: (id: number) => Promise<User | undefined>;
export declare const createUser: ({ name, email, age }: UserInput) => Promise<User>;
export declare const updateUser: (id: number, { name, email, age }: UserInput) => Promise<boolean>;
export declare const deleteUser: (id: number) => Promise<boolean>;
//# sourceMappingURL=userModel.d.ts.map