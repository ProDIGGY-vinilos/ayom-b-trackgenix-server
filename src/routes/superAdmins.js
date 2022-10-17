import express from 'express';
import superAdminsControllers from '../controllers/superAdmins';
import superAdminsValidations from '../validations/superAdmins';

const router = express.Router();

router
  .get('/', superAdminsControllers.getAllsuperAdmins)
  .post('/', superAdminsValidations.validateCreation, superAdminsControllers.createSuperAdmin);

export default router;
