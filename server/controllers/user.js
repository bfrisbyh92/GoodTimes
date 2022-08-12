import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
const secret =
  process.env.SECRET || "Its no big secret but well put it up anyways";
// console.log(secret);

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // ^^^ Find a user in MongoDB
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    // ^^^ If no User found, send message that user doesn't exist
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // ^^^ If there is a user, compare the password supplied to the hashed password using bcryptjs
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    // ^^^ If the passwords don't match, send message invalid credentials
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "1h",
    });
    // ^^^ If everything checks out, We sign a token with jsonwebtoken package

    console.log(
      `user: ${user}, isPasswordCorrect: ${isPasswordCorrect}, token: ${token}`
    );
    // Have to make sure right?

    res.status(200).json({ result: user, token });
    // ^^^ If all is well, send a 200 response with the correct user and a signed token with 1hr acceess.
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
    });
    console.log(`result: ${result}`);
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    console.log(`hashedPassword: ${hashedPassword} token: ${token}`);
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
// ^^^ Sign up is almost exactly the same as sigin so no comments.
