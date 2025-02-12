const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRoute =require("./routes/productRoutes.js");
const clientRoutes = require("./routes/clientRoutes.js");
const cors = require('cors')
app.use(express.json());

//routes
app.use("/api/product",  productRoute)
app.use("/api/client", clientRoutes);


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cors());

app.listen(3000, () => {
    console.log("server is running in port 3000");
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