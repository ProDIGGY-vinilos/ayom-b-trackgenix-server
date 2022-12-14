import express from 'express';
import superAdminsControllers from '../controllers/superAdmins';
import superAdminsValidations from '../validations/superAdmins';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', checkAuth(['SUPER_ADMIN']), superAdminsControllers.getAllSuperAdmins);
router.get('/:id', checkAuth(['SUPER_ADMIN']), superAdminsControllers.getSuperAdminById);
router.get('/firebase/:id', checkAuth(['SUPER_ADMIN']), superAdminsControllers.getSuperAdminByFirebaseId);
router.post('/', superAdminsValidations.validateCreation, superAdminsControllers.createSuperAdmin);
router.put('/:id', checkAuth(['SUPER_ADMIN']), superAdminsValidations.validateCreation, superAdminsControllers.editSuperAdmin);
router.delete('/:id', checkAuth(['SUPER_ADMIN']), superAdminsControllers.deleteSuperAdmin);

export default router;
