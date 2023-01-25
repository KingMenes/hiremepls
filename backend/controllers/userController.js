import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const logoutUser = asyncHandler(async (req, res) => {
  req.session.user = null;
  res.json({ message: "Logged out" });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.json({ error: "user not found" });
  }
  res.json(user);
});

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const isAuth = asyncHandler(async (req, res) => {
  const session = req.session.user;
  console.log(session);
  if (session) {
    const user = await User.findOne({ email: req.session.user.email });
    return res.json({
      _id: user.id,
      token: generateToken(user._id),
      username: user.username,
      email: user.email,
      reputation: user.reputation,
    });
  } else {
    return res.status(401).json("unauthorized");
  }
});

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  // console.log(username)
  if (!username) {
    res.status(400);
    throw new Error("Please add a username");
  }
  if (!password) {
    res.status(400);
    throw new Error("Please add a password");
  }
  if (!email) {
    res.status(400);
    throw new Error("Please add an email address");
  }
  let userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email already used");
  }
  if (!userExist) {
    userExist = await User.findOne({ nameLower: username.toLowerCase() });
    if (userExist) {
      throw new Error("Username already used");
    }
    if (userExist.username === "count") {
      throw new Error("Username cannot be used");
    }
  }
  //password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: "user",
    reputation: [],
    nameLower: username.toLowerCase(),
  });

  if (user) {
    const userSession = { email: user.email };
    req.session.user = userSession;
    res.json({
      _id: user.id,
      token: generateToken(user._id),
      username: user.username,
      email: user.email,
      reputation: user.reputation,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

export const logInUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  let user = await User.findOne({ nameLower: username.toLowerCase() });
  if (!user) {
    user = await User.findOne({ email });
  }

  if (!user) {
    res.json({ error: "Incorrect Login Information" });
    throw new Error("Login information incorrect");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const userSession = { email: user.email };
    req.session.user = userSession;
    res.json({
      _id: user.id,
      token: generateToken(user._id),
      username: user.username,
      email: user.email,
      reputation: user.reputation,
      userSession,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await user.findById(req.params.id);
  if (!question) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await user.remove();

  res.json({ message: "Account successfully deleted" });
});
