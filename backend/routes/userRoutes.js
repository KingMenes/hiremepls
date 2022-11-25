import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js"
import { getUser, createUser, updateUser, deleteUser, logInUser, getMe } from "../controllers/userController.js"

router.get('/me', protect, getMe)
router.get('/:id', getUser)
router.post('/login', logInUser)
router.post('/', createUser)
router.put('/:id', protect, updateUser)
router.delete('/:id', protect, deleteUser)

export default router;
