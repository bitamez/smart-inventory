import express from 'express';
import { getUsers, getUserById, updateUser, deactivateUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUsers);
router.route('/:id').get(getUserById).put(updateUser).delete(deactivateUser);

export default router;
