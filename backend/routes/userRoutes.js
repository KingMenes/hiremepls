import express from "express";
const router = express.Router();

import { getUser, createUser, updateUser, deleteUser, logInUser } from "../controllers/userController.js"

router.get('/:id', getUser)
router.post('/', createUser)
router.post('/login', logInUser)
router.put('/:id', updateUser)
router.delete('/id', deleteUser)

export default router;
