import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.zod.validation';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:id', auth('faculty', 'admin'), StudentControllers.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
