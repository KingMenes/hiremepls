import express from "express";
const router = express.Router();

import { getUser, createUser, updateUser, deleteUser } from "../controllers/userController.js"

router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/id', deleteUser)

export default router;
