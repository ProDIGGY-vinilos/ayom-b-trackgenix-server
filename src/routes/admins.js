import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router();

router
  .get('/:id', adminsControllers.getAdminById)
  .delete('/:id', adminsControllers.deleteAdmin)
  .put('/:id', adminValidations.editAdmin, adminsControllers.editAdmin);

export default router;
