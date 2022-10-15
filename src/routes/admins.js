import express from 'express';
import adminsControllers from '../controllers/admins';
import adminsValidations from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsControllers.getAllAdmins)
  .post('/', adminsValidations.validateCreation, adminsControllers.createAdmin);

export default router;
