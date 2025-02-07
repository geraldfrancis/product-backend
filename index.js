const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors");
const productRoute =require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js")

app.use(express.json());

//routes
app.use("/api/product",  productRoute)
app.use("/api/user", userRoutes);


app.use(cors());


app.listen(9000, () => {
    console.log("server is running in port 9000");
});


app.get("/", (req, res) => {
    res.send("Mr Nnamdi");
});

mongoose 
.connect(
    "mongodb+srv://ugochukwutasi:ilprnNX5uliCGLN2@francis.7tt5p.mongodb.net/"
)
.then(() => {
    console.log("database connected");
})
.catch(()=> {
    console.log("database not connected");
})