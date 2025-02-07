const bcrypt = require('bcrypt');
const User = require('../module/userModule');



const registerUser = async (req, res) => {
    try {
        let { name, email, userName, password, phoneNumber, sex, maritalStatus, userNumber} = req.body;

        if (!name || !email || !userName || !password || !phoneNumber || !sex || !maritalStatus || !userNumber) {
            return res.status(400).json({ message: "All Required Fields Must Be Provided" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user in the database
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            sex,
            maritalStatus,
            userName,userNumber
        });

        // Register user in database
        const registeredUser = await newUser.save();
        console.log(registeredUser); 
        // Log the registered user to verify it worked
        res.status(201).json(registeredUser);

    } catch (err) {
        console.error("registration Error:", err);

        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyValue)[0];
            return res.status(400).json({
                message: `${duplicateField} is already in use.`,
                field: duplicateField,
            });
        }

        res.status(500).json({ message: "Error registering user", err: err.message });
    }
};


// Get All User

const getUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });  
    }
};



//login user

const loginUser = async (req, res)  => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "email and password are required"})
        }

        //find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "EMAIL not found"});
        }
        console.log(user);
        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "invalid password"})
        }
        //excude the password before returning user details
        const userResponse = user.toObject();
        delete userResponse.password
        
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error})
    }
};

//update user 
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        //find user by id 
        const user = await User.findById(id);
        if (!User) {
            return res.status(404).json({ message : "User not Found"});
        }

        //find user fields
        const updatedData = req.body;

        //only hash password if its being updated
        if (updatedData.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        //update user in the database
        const updatedUser = await User.findByIdAndUpdate (id, updatedData, {
            new: true, // return the updated document
            runValidators: true, // enforce validators rule
        });
        res
          .status(200)
          .json({ message: "User Updated Successfully", updatedUser});
    } catch (error) {
        console.error("Error updating user", error);
        res
          .status(500)
          .json({ messag: "Error Updating User", error: error.messag });
    }
};
// delete users
let deleteUser = async (req, res) => {
    try { 
      const { id } = req.params;
      // check if user exists
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }  
      // delete the user
      await user.deleteOne();
      res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        console.error("Error deleting user", error);
        res
          .status(500)
          .json({ message: "Error deleting user", error: error.message});
    }
};

// get user by id 
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        //find user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error retriving user", error);
        if (error.kind === "objectId") {
            return res. status(400).json({ message: "invalid user ID format" });
        }
        res 
          .status(500)
          .json({ message: "Error retriving user", error: error.message });
    }
};


module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getUsers,
    deleteUser,
    getUserById
};

// const bcrypt = require ('bcrypt')
// const asyncHandler = require('express-async-handler')
// let User = require('../module/userModule.js')

// const registerUser = asyncHandler(async (req, res) => {
//     const {name, email, password, userName, phoneNumber, maritalStatus, sex} = req.body

//     //validate

//     if(!name || !email || !password ||userName ||phoneNumber ||maritalStatus ||sex) {
//         res.status(400)
//         throw new Error("Please add all fields")
//     }

//     const userExists = await User.findOne({email})

//     if(userExists){
//         res.status(400)
//         throw new Error("User already exists")
//     }

//     //hash password

//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)

//     //create new user

//     const user = await User.create({
//         name : name, 
//         email : email, 
//         password : hashedPassword,
//         userName: userName,
//         phoneNumber:phoneNumber,
//         maritalStatus:maritalStatus,
//         sex:sex
//     })

//     if (user){
//         res.status(201).json({
//             _id: user.id,
//             name: user.name,
//             email: user.email ,
//             userName: user.userName
//         })
//     } else {
//         res.status(400)
//         throw new Error("Invalid user data")
//     }
// })


// module.exports   = {
//     registerUser
// }