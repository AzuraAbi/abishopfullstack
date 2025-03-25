import express from "express"
import cors from "cors"
import createUserTable from "./models/userModel.js"
import userRoutes from "./routes/userRoutes.js";
import "dotenv/config.js"

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

createUserTable();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend đang chạy")
})


app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`))