const express = require("express");
const {
    registerClient,
    loginClient,
    getClientById,
    updateClient,
    deleteClient,
    getAllClient
} = require("../controller/clientController.js");

const router = express.Router();

router.post("/register", registerClient)
router.post("/login", loginClient)
router.get("/:id", getClientById)
router.put("/:id", updateClient)
router.delete("/:id", deleteClient)
router.get("/", getAllClient)

module.exports = router;