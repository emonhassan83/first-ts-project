import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, student: studentData } = req.body;
  
      // creating a  schema validation using joi
    //   const { error, value } = studentValidationSchema.validate(studentData);
  
      // data validating using zod
      // const zodParsedData = studentValidationSchema.parse(studentData);
  
      // will call service function to send this data
      const result = await UserService.createStudentIntoDB(password, studentData);
  
      // send response
      // res.status(200).json({
      //   success: true,
      //   message: 'Student is created successfully',
      //   data: result,
      // });
      
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: result,
      })
    } catch (err) {
      next(err);
    }
  };

  export const UserControllers = {
    createStudent,
  }