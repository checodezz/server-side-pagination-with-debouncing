const express = require("express")
const connectDB = require("./db/db.connect")
const userRoutes = require("./routes/user")
require('dotenv').config();
const app = express()
const PORT = 3000;

connectDB()

app.use(express.json());
app.use("/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is up at PORt ${PORT}`)
})
