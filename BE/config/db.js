import mysql from "mysql2"
import "dotenv/config.js"

const data_base = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

data_base.connect((err) => {
    if(err) {
        console.log("❌ Kết nối MySQL thất bại:", err)
        return
    }

    console.log("✅ Kết nối MySQL thành công");
})

export default data_base