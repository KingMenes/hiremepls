import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js"
import { getUser, createUser, updateUser, deleteUser, logInUser } from "../controllers/userController.js"

router.get('/:id', getUser)
router.post('/', createUser)
router.post('/login', logInUser)
router.put('/:id', protect, updateUser)
router.delete('/id', protect, deleteUser)

export default router;
