const Product = require("../module/product.module.js");

// Get All Product

const getProuducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });  
    }
};

// Get Product By Id
const getProductById = async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).jsonp(product);
    }   catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// Update product 
const findByIdAndUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
           return res.status (404).json({ message: "product Not Found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// create a product 
const Create = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};
// delete post
const findByIdAndDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        
        res.status(200).json({ message: "product Deleted Successfully"});
    }   catch (error) {
        res.status(500).json({ message: error.message});
    }
}
module.exports = {
    getProuducts, getProductById, findByIdAndUpdate, Create, findByIdAndDelete
}