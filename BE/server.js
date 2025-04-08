import express, { application } from "express"
import cors from "cors"
import createUserTable from "./models/userModel.js"
import userRoutes from "./routes/userRoutes.js";
import "dotenv/config.js"
import bodyParser from "body-parser";
import db from "./config/db.js";
import jwt from "jsonwebtoken"
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import sharp from "sharp";
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000
const SECRET_KEY = process.env.SECRET_KEY

createUserTable();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/uploadAvt", upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Không có file nào được chọn!" });

    const { userId } = req.body

    const webpFilename = `avatar-${userId}.webp`
    const webpPath = `./uploads/${webpFilename}`
    const imageUrl = `/uploads/${webpFilename}`

    try {

        const [oldImage] = await new Promise((resolve, reject) => {
            db.query("SELECT avturl FROM avatar WHERE userid = ?", [userId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });


        if (oldImage && oldImage.avturl) {
            const oldImagePath = `.${oldImage.avturl}`;
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        await sharp(req.file.buffer)
            .resize(500)
            .toFormat("webp")
            .webp({ quality: 80 })
            .toFile(webpPath);

        const query = `INSERT INTO avatar (userid, avturl) VALUE (?, ?) ON DUPLICATE KEY UPDATE avturl = ?`

        db.query(query, [userId, imageUrl, imageUrl], (e) => {
            if (e) return res.status(500).json({ error: e.message });
            res.json({ message: "Avatar updated successfully", imageUrl });
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


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

        if (existingEmail.length > 0) {
            return res.json({
                success: false,
                msg: "Email đã tồn tại"
            })
        }

        const [existingPhone] = await db.promise().query(query_phone, [phone])

        if (existingPhone.length > 0) {
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

    } catch (error) {
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

app.get("/danhmuc", (req, res) => {
    const query = "SELECT * FROM danhmuc ORDER BY idDanhmuc ASC"

    db.query(query, (err, result) => {
        if (err) {
            if (err) return res.status(500).json({ error: err.message });
        }

        res.json(result)
    })
})


app.get("/getUsername/:id", (req, res) => {
    const userId = req.params.id;
    const query = "SELECT * FROM users WHERE userid = ?"

    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false });
        }
        if (result.length === 0) return res.status(404).json({ status: false });

        res.json({
            status: true,
            value: result[0].username
        })
    })
})

app.get("/getSodu/:id", (req, res) => {
    const userId = req.params.id;
    const query = "SELECT sodu.sodu FROM sodu INNER JOIN users ON sodu.userid = users.userid WHERE sodu.userid = ?"

    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false })
        }

        if (result.length === 0) {
            const addSodu = "INSERT INTO sodu (userid, sodu) VALUE (?, ?)"

            db.query(addSodu, [userId, 0], (e, r) => {
                if (e) {
                    return res.status(500).json({ status: false })
                }

                res.json({
                    status: true,
                    value: 0
                })
            })

        } else {
            res.json({
                status: true,
                value: result[0].sodu
            })
        }
    })
})

app.get("/getEmail/:id", (req, res) => {
    const userId = req.params.id;
    const query = "SELECT * FROM users WHERE userid = ?"

    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false });
        }
        if (result.length === 0) return res.status(404).json({ status: false });

        res.json({
            status: true,
            value: result[0].email
        })
    })
})

app.get("/getPhone/:id", (req, res) => {
    const userId = req.params.id;
    const query = "SELECT * FROM users WHERE userid = ?"

    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false });
        }
        if (result.length === 0) return res.status(404).json({ status: false });

        res.json({
            status: true,
            value: result[0].phone
        })
    })
})

app.get("/getMota/:id", (req, res) => {
    const userId = req.params.id;
    const query = "SELECT * FROM mota WHERE userid = ?"

    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false });
        }
        if (result.length === 0) {
            db.query("INSERT INTO mota (userid, mota) VALUE (?, ?)", [userId, ""], (e, r) => {
                if (e) {
                    return res.status(500).json({ status: false })
                }

                res.json({
                    status: true,
                    value: ""
                })
            })
        } else {
            res.json({
                status: true,
                value: result[0].mota
            })
        }
    })
})

app.post("/api/updateDesc", (req, res) => {
    const { userId, description } = req.body

    console.log(userId, description)

    const queryCheck = "SELECT * FROM mota WHERE userid = ?"

    db.query(queryCheck, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false });
        }

        const check = (result.length === 0)

        if (check) {
            const query = "INSERT INTO mota (userid, mota) VALUE (?, ?)"

            db.query(query, [userId, description], (e, r) => {
                if (e) {
                    return res.status(500).json({ status: false });
                }

                res.json({ status: true, desc: description })
            })
        } else {
            const query = "UPDATE mota SET mota = ? WHERE userid = ?"

            db.query(query, [description, userId], (e, r) => {
                if (e) {
                    return res.status(500).json({ status: false });
                }

                res.json({ status: true, desc: description })
            })

        }
    })
})

app.get("/getAvt/:id", (req, res) => {
    const userId = req.params.id;
    const query = "SELECT * FROM avatar WHERE userid = ?"

    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false });
        }
        if (result.length === 0) {
            db.query("INSERT INTO avatar (userid, avturl) VALUE (?, ?)", [userId, "url(../../public/abu.png)"], (e, r) => {
                if (e) {
                    return res.status(500).json({ status: false })
                }

                res.json({
                    status: true,
                    value: "url(../../public/abu.png)"
                })
            })
        } else {
            res.json({
                status: true,
                value: result[0].avturl
            })
        }
    })
})


app.post("/api/changeUsername", (req, res) => {
    const { userId, username } = req.body

    const query = "UPDATE users SET username = ? WHERE userid = ?"

    db.query(query, [username, userId], (e, r) => {
        if (e) {
            return res.status(500).json({ status: false });
        }

        res.json({ status: true })
    })
})

app.post("/api/changePhone", (req, res) => {
    const { userId, phone } = req.body

    const queryCheck = "SELECT * FROM users WHERE phone = ?"

    db.query(queryCheck, [phone], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, msg: "" });
        }

        if (result.length === 0) {
            const query = "UPDATE users SET phone = ? WHERE userid = ?"

            db.query(query, [phone, userId], (e, r) => {
                if (e) {
                    return res.status(500).json({ status: false, msg: "" });
                }

                res.json({ status: true })
            })
        } else {
            res.json({ status: false, msg: "error" })
        }
    })
})

app.post("/api/changePassword", (req, res) => {
    const { userId, curPass, pass } = req.body

    const queryCheckCur = "SELECT * FROM users WHERE userid = ? AND password = ?"

    db.query(queryCheckCur, [userId, curPass], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, msg: "" });
        }

        if (result.length === 0) {
            res.json({ status: false, msg: "Mật khẩu không chính xác" })
        } else {
            const queryChange = "UPDATE users SET password = ? WHERE userid = ?"

            db.query(queryChange, [pass, userId], (e, r) => {
                if (e) {
                    return res.status(500).json({ status: false, msg: "" });
                }

                res.json({ status: true })
            })
        }
    })
})

app.post("/api/changeEmail", (req, res) => {
    const { userId, email } = req.body

    const queryCheck = "SELECT * FROM users WHERE email = ?"

    db.query(queryCheck, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, msg: "" });
        }

        if (result.length === 0) {
            const query = "UPDATE users SET email = ? WHERE userid = ?"

            db.query(query, [email, userId], (e, r) => {
                if (e) {
                    return res.status(500).json({ status: false, msg: "" });
                }

                res.json({ status: true })
            })
        } else {
            res.json({ status: false, msg: "error" })
        }
    })
})

app.post("/api/themsanpham", upload.single('anh'), async (req, res) => {

    const { userid, ten, gia, mota, danhmuc } = req.body
    const anh = req.file

    console.log(req.body)

    const countQuery = "SELECT COUNT(*) AS total FROM mathang WHERE userid = ?"

    try {
        db.query(countQuery, [userid], async (err, result) => {
            if (err) return res.status(500).json({ status: false, error: err.message });

            const sothutu = result[0].total + 1
            const webpFilename = `mathang-${userid}-${sothutu}.webp`
            const webpPath = `./uploads/${webpFilename}`
            const imageUrl = `/uploads/${webpFilename}`


            await sharp(anh.buffer)
                .resize(500)
                .toFormat("webp")
                .webp({ quality: 80 })
                .toFile(webpPath)

            const insertQuery = "INSERT INTO mathang (tenmathang, giaban, mota, anhsanpham, userid) VALUE (?, ?, ?, ?, ?)"

            db.query(insertQuery, [ten, gia, mota, imageUrl, userid], (e, r) => {
                if (e) return res.status(500).json({ status: false, error: e.message });

                const idmathang = r.insertId

                for (let i = 0; i < danhmuc.length; i += 2) {
                    const dmQuery = "INSERT INTO loaisanpham (idmathang, iddanhmuc) VALUE (?, ?)"

                    db.query(dmQuery, [idmathang, danhmuc[i]])
                }

                res.json({ status: true })
            })

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Lỗi xử lý ảnh hoặc lưu sản phẩm' });
    }
})

app.post("/api/capnhatsanpham", upload.single("file"), async (req, res) => {
    const { userid, idmathang, ten, gia, mota, anhcu } = req.body
    let file = anhcu

    try {
        if (req.file) {
            const filename = `mathang-${userid}-${idmathang}.webp`
            const filepath = `./uploads/${filename}`
            const imageUrl = `/uploads/${filename}`

            await sharp(req.file.buffer)
                .resize(500)
                .toFormat("webp")
                .webp({ quality: 80 })
                .toFile(filepath)

            file = imageUrl

            if (anhcu && anhcu !== imageUrl) {
                const old = `.${anhcu}`
                fs.unlinkSync(old)
            }
        }

        const updateQuery = "UPDATE  mathang SET tenmathang = ?, giaban = ?, mota = ?, anhsanpham = ? WHERE idmathang = ?"

        db.query(updateQuery, [ten, gia, mota, file, idmathang])

        res.json({ status: true })
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', err);
        res.status(500).json({ success: false, message: 'Lỗi server!' });

    }
})

app.get("/getsanpham/:id", (req, res) => {
    const userId = req.params.id;
    const query = "SELECT * FROM mathang WHERE userid = ?"

    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false });
        }

        res.json({
            status: true,
            value: result
        })

    })
})

app.get("/lay-thong-tin-san-pham/:id", (req, res) => {
    const idsp = req.params.id

    const query1 = "SELECT * FROM mathang WHERE idmathang = ?"
    console.log(idsp)

    db.query(query1, [idsp], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false })
        }


        const tensp = result[0].tenmathang
        const giaban = result[0].giaban
        const mota = result[0].mota
        const anh = result[0].anhsanpham

        const query2 = "SELECT * FROM loaisanpham WHERE idmathang = ?"

        db.query(query2, [idsp], (e, r) => {
            if (e) {
                return res.status(500).json({ status: false })
            }

            const danhmuc = []

            for (let i = 0; i < r.length; i++) {
                danhmuc.push(r[i].iddanhmuc)
            }

            const toReturn = {
                tensp: tensp,
                gia: giaban,
                mota: mota,
                anh: anh,
                danhmuc: danhmuc
            }

            console.log(toReturn)

            res.json(toReturn)
        })
    })
})

app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`))