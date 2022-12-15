import express from 'express';
import adminValidations from '../validations/admins';
import adminControllers from '../controllers/admins';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), adminControllers.getAllAdmins);
router.get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), adminControllers.getAdminById);
router.get('/firebase/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), adminControllers.getAdminByFirebaseId);
router.post('/', checkAuth(['SUPER_ADMIN']), adminValidations.validateCreation, adminControllers.createAdmin);
router.put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), adminValidations.editValidation, adminControllers.editAdmin);
router.delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), adminControllers.deleteAdmin);

export default router;
