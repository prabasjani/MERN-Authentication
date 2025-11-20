import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthModel } from "../models/Auth.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await AuthModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists!" });
    }

    // Hash the Password for security purpose
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new AuthModel({
      username,
      email,
      password: hashedPwd,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error User Registration: ${error.message}`,
    });
    console.log(`Error User Registration: ${error.message}`);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    }

    // Verify the Password user entered
    const verifyPwd = await bcrypt.compare(password, user.password);

    if (!verifyPwd) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password!" });
    }

    // Token creation using user ID for Secure login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send the token securely without storing the token in JS
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production", // false
      sameSite: process.env.NODE_ENV == "production" ? "none" : "lax", // "lax"
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Successfully Logged In",
      userID: user._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error User Login: ${error.message}`,
    });
    console.log(`Error User Login: ${error.message}`);
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the cookie to Logout - token saves in cookies
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "Successfully Logged Out!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in Logout User: ${error.message}`,
    });
    console.log(`Error in Logout User: ${error.message}`);
  }
};

export const currentUser = async (req, res) => {
  try {
    // req.user is coming from verifyToken - decoded the token
    const user = await AuthModel.findById(req.user).select("-password"); // It means verified user only

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    }

    res.status(200).json({
      success: true,
      message: "User Data Fetched!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in Current User: ${error.message}`,
    });
    console.log(`Error in Current User: ${error.message}`);
  }
};

export const deleteUser = async (req, res) => {
  try {
    // req.user is coming from verifyToken - decoded the token
    const user = await AuthModel.findByIdAndDelete(req.user); // It means verified user only
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid User ID!" });
    }

    res.status(200).json({ success: true, message: "User Data Deleted!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in Delete User: ${error.message}`,
    });
    console.log(`Error in Delete User: ${error.message}`);
  }
};
