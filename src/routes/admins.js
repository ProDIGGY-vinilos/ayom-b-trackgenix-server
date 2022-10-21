import express from 'express';
import adminValidations from '../validations/admins';
import adminControllers from '../controllers/admins';

const router = express.Router();

router.get('/', adminControllers.getAllAdmins);
router.post('/', adminValidations.validateCreation, adminControllers.createAdmin);
router.get('/:id', adminControllers.getAdminById);
router.delete('/:id', adminControllers.deleteAdmin);
router.put('/:id', adminValidations.editValidation, adminControllers.editAdmin);

export default router;
