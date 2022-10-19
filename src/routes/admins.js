import express from 'express';
import adminValidations from '../validations/admins';
import adminControllers from '../controllers/admins';

const router = express.Router();

router
  .get('/', adminControllers.getAllAdmins)
  .post('/', adminValidations.validateCreation, adminControllers.createAdmin)
  .get('/:id', adminControllers.getAdminById)
  .delete('/:id', adminControllers.deleteAdmin)
  .put('/:id', adminValidations.editValidation, adminControllers.editAdmin);

export default router;
