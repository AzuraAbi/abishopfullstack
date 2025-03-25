import db from "../config/db.js"

export const getAllUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            if (err) return res.status(500).json({ error: "Lỗi truy vấn CSDL" });
            res.json(result);
        }
    })
}

export const createUser = (req, res) => {
    const { email, phone, username, password } = req.body;

    const sql = "INSERT INTO users (email, phone, username, password) VALUES (?, ?, ?, ?)";

    db.query(sql, [email, phone, username, password], (err, result) => {
        if (err) return res.status(500).json({ error: "Lỗi tạo người dùng" });

        res.status(201).json({ message: "Tạo người dùng thành công", userId: result.insertId });
    });
};