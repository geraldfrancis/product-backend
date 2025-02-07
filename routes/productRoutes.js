const express = require("express");
const product = require("../module/product.module.js");
const { getProuducts, getProductById, findByIdAndUpdate, Create, findByIdAndDelete} = require("../controller/productController.js");
const router = express.Router();

router.get("/", getProuducts);
router.get("/:id", getProductById);
router.put("/:id", findByIdAndUpdate);
router.post("/", Create);
router.delete("/:id", findByIdAndDelete);

module.exports = router;