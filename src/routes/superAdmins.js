import express from 'express';
import superAdminsControllers from '../controllers/superAdmins';
import superAdminsValidations from '../validations/superAdmins';

const router = express.Router();

router.get('/', superAdminsControllers.getAllSuperAdmins);
router.get('/:id', superAdminsControllers.getSuperAdminById);
router.post('/', superAdminsValidations.validateCreation, superAdminsControllers.createSuperAdmin);
router.put('/:id', superAdminsValidations.validateCreation, superAdminsControllers.editSuperAdmin);
router.delete('/:id', superAdminsControllers.deleteSuperAdmin);

export default router;
