const bcrypt = require('bcrypt');
const Client = require("../module/clientModule.js");

//register client

const registerClient = async (req, res) => {
    try {
        let { name, email, userName, password, phoneNumber, sex, maritalStatus } = req.body;
        //validation required field
        if (
            !name ||
            !email ||
            !userName ||
            !password ||
            !phoneNumber ||
            !sex ||
            !maritalStatus 
        )
        {
          return res
          .status(400)
          .json({ message: "All Required Fields Must Be Provided"});  
        }
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //save client in database
        const newClient = new Client({
            name,
            email,
            userName,
            password: hashedPassword,
            phoneNumber,
            sex,
            maritalStatus,
        });

        //Register client in database
        const registeredClient = await newClient.save();
        res.status(201).json(registeredClient);
    } catch (error) {
        console.error("Registration Error", error);

        //handle duplicate key errors
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate value", field: Object.keys(error.keyValue)});
        }
        res
        .status(500)
        .json({ message: "Error registering client", error: error.message });
    }
};

//get all client
const getAllClient = async (req, res) => {
    try {
        const client = await Client.find({});
        res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ message: error.message });  
    }
};


// Login Client
const loginClient = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName|| !password) {
            return res
            .status(400)
            .json({ message: "userName and password are required" });
        }

        //find the client by userName
        const client = await Client.findOne({ userName });
        if (!client) {
            return res.status(404).json({ message: "userName not found" });
        }
        console.log(client);
        
        //Compare Password
        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        //Exclude the password before returning client details
        const clientResponse = client.toObject();
        delete clientResponse.password;
        // res.setHeader("Access-Control-Allow-Origin", "*")
        // res.setHeader("Access-Control-Allow-Credentials", "true");
        // res.setHeader("Access-Control-Max-Age", "1800");
        // res.setHeader("Access-Control-Allow-Headers", "content-type");
        // res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        res.status(200).json(clientResponse);
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

//update clients
const updateClient = async (req, res) => {
    try {
        const { id } = req.params;

        //find client by id
        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ message: "client not found" });
        }

        //find client fields
        const updatedData = req.body;

        //only hash password if its being updated
        if (updatedData.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        //update client in the database
        const updatedClient = await Client.findByIdAndUpdate(id, updatedData, {
            new: true, //reture the updated document
            runValidators: true, //enforce validators rule
        });
        res
        .status(200)
        .json({ message: "Client Updated Successfully", updatedClient });
    } catch (error) {
        console.error("Error Updating Client", error);
        res.status(500).json({ message: "Error Updating Client", error: error.message });
    }
};

// delete a client
let deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        //check if client exists
        const client = await Client.findById(id);
        if (!client) {
            return res.status(400).json({ message: "Client Not Found" });
        }

        // Delete the client
        await client.deleteOne();
        res.status(200).json({ message: "client deleted successfully" });
    } catch (error) {
       console.error("Error deleting client", error);
       res
         .status(500)
         .json({ message: "Error deleting Client", error: error.message });
    }
};

// Get client by id 
const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        // find user by id 
        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ message: "Client Not Found" });
        }
        res.status(200).json(client);
    } catch (error) {
        console.error("Error retriving Client", error);
        if (error.kind === "objectId") {
            return res.status(400).json({ message: "invalid client ID format" });
        }
        
        res
          .status(500)
          .json({ message: "Error retriving client", error: error.message });
    }
};

module.exports = {
    registerClient,
    loginClient,
    updateClient,
    deleteClient,
    getClientById,
    getAllClient
}