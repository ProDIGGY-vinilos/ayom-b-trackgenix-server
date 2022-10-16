import express from 'express';
import employeesControllers from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .get('/', employeesControllers.getAllEmployees)
  .post('/', employeesValidations.validateCreation, employeesControllers.createEmployee);

export default router;
