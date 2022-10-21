import express from 'express';
import employeesControllers from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router.get('/:id', employeesControllers.getEmployeeById);
router.put('/:id', employeesValidations.validateCreation, employeesControllers.editEmployee);
router.delete('/:id', employeesControllers.deleteEmployee);
router.get('/', employeesControllers.getAllEmployees);
router.post('/', employeesValidations.validateCreation, employeesControllers.createEmployee);

export default router;
