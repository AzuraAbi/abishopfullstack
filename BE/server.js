import express, { application } from "express"
import cors from "cors"
import createUserTable from "./models/userModel.js"
import userRoutes from "./routes/userRoutes.js";
import "dotenv/config.js"
import bodyParser from "body-parser";
import db from "./config/db.js";
import jwt from "jsonwebtoken"

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000
const SECRET_KEY = process.env.SECRET_KEY

createUserTable();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend đang chạy")
})

app.get("/api/user/:id", (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    const sql = "SELECT username FROM users WHERE userid = ?";

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Lỗi server" });
        if (results.length === 0) return res.status(404).json({ error: "Không tìm thấy user" });

        res.json(results[0]);
    });
});

app.post("/api/register", async (req, res) => {
    const { username, email, phone, password } = req.body

    const query_email = "SELECT * FROM users WHERE email = ?"
    const query_phone = "SELECT * FROM users WHERE phone = ?"
    const query = "INSERT INTO users (username, email, phone, password) VALUE (?, ?, ?, ?)"

    try {
        const [existingEmail] = await db.promise().query(query_email, [email])
    
        if(existingEmail.length > 0) {
            return res.json({
                success: false,
                msg: "Email đã tồn tại"
            })
        }

        const [existingPhone] = await db.promise().query(query_phone, [phone])

        if(existingPhone.length > 0) {
            return res.json({
                success: false,
                msg: "Số điện thoại đã tồn tại"
            })
        }

        await db.promise().query(query, [username, email, phone, password])

        res.json({
            success: true,
            msg: "Đăng ký thành công"
        })

    } catch(error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
})

app.post("/api/login", (req, res) => {
    const { username, password } = req.body

    const query = 'SELECT * FROM users WHERE (((email = ?) OR (phone = ?)) AND password = ?)'

    db.query(query, [username, username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi server", error: err });
        }

        if (result.length > 0) {
            const user = result[0]
            const token = jwt.sign(
                {
                    id: user.userid,
                },
                SECRET_KEY, 
                { expiresIn: "1h" }
            )

            res.json({
                success: true,
                token,
                user: {
                    id: user.userid,
                }
            });
        } else {
            res.json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
        }
    })
})


app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`))