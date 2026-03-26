// import db from "../database/db.js";
// import type { User, UserInput } from "../types/user.js";
// export const getAllUsers = (search?: string, sort?: keyof User, order: "asc" | "desc" = "asc"): User[] => {
//   let query = "SELECT * FROM users";
//   const params: any[] = [];
//   if (search) {
//     query += " WHERE name LIKE ? OR email LIKE ?";
//     params.push(`%${search}%`, `%${search}%`);
//   }
//   if (sort) {
//     query += ` ORDER BY ${sort} ${order.toUpperCase()}`;
//   }
//   const stmt = db.prepare(query) as any;
//   console.log(stmt)
//   return stmt.all(...params) as User[];
// };
// export const getUserById = (id: number): User | undefined => {
//   const stmt = db.prepare("SELECT * FROM users WHERE id = ?") as any;
//   return stmt.get(id) as User | undefined;
// };
// export const createUser = ({ name, email, age }: UserInput): User => {
//   const stmt = db.prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)");
//   const info = stmt.run(name, email, age) as any;
//   // const user = db.prepare("SELECT * FROM users WHERE id = ?")
//   //   .get(info.lastInsertRowid) as any;
//   // return user;
//   console.log(info.lastInsertRowid)
//   return { id: info.lastInsertRowid as number, name, email, age } as User;
// };
// export const updateUser = (id: number, { name, email, age }: UserInput): boolean => {
//   const stmt = db.prepare("UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?");
//   const info = stmt.run(name, email, age, id) as any;
//   return info.changes > 0;
// };
// export const deleteUser = (id: number): boolean => {
//   const stmt = db.prepare("DELETE FROM users WHERE id = ?");
//   const info = stmt.run(id) as any;
//   return info.changes > 0;
// };
import db from "../database/db.js";
// helpers
const runAsync = (sql, params = []) => new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
        if (err)
            reject(err);
        else
            resolve({ lastID: this.lastID });
    });
});
const getAsync = (sql, params = []) => new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
        if (err)
            reject(err);
        else
            resolve(row);
    });
});
const allAsync = (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
        if (err)
            reject(err);
        else
            resolve(rows);
    });
});
// ✅ GET ALL
export const getAllUsers = async (search, sort, order = "asc") => {
    let query = "SELECT * FROM users";
    const params = [];
    if (search && search.trim() !== "") {
        query += " WHERE name LIKE ? OR email LIKE ?";
        params.push(`%${search}%`, `%${search}%`);
    }
    if (sort) {
        query += ` ORDER BY ${sort} ${order.toUpperCase()}`;
    }
    return (await allAsync(query, params));
};
// ✅ GET BY ID
export const getUserById = async (id) => {
    return (await getAsync("SELECT * FROM users WHERE id = ?", [id]));
};
// ✅ CREATE
export const createUser = async ({ name, email, age }) => {
    const { lastID } = await runAsync("INSERT INTO users (name, email, age) VALUES (?, ?, ?)", [name, email, age]);
    const user = await getAsync("SELECT * FROM users WHERE id = ?", [lastID]);
    return user;
};
// ✅ UPDATE
export const updateUser = async (id, { name, email, age }) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?", [name, email, age, id], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes > 0);
        });
    });
};
// ✅ DELETE
export const deleteUser = async (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes > 0);
        });
    });
};
//# sourceMappingURL=userModel.js.map