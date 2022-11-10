import express from 'express';
import employeesControllers from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router.get('/', employeesControllers.getAllEmployees);
router.get('/:id', employeesControllers.getEmployeeById);
router.post('/', employeesValidations.validateCreation, employeesControllers.createEmployee);
router.put('/:id', employeesValidations.validateCreation, employeesControllers.editEmployee);
router.delete('/:id', employeesControllers.deleteEmployee);

export default router;
