import db from '../config/db.js'

const createUserTable = () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        userid INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `
    db.query(sql, (err) => {
        if (err) console.error("❌ Lỗi tạo bảng users:", err)
        else console.log("✅ Bảng users đã sẵn sàng")
    })
}

export default createUserTable