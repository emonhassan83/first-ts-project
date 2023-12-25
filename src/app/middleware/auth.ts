import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    //  const decoded = jwt.verify(
    //     token,
    //     config.jwt_access_secret as string,
    //   ) as JwtPayload;

    jwt.verify(token, config.jwt_access_secret as string, function(err, decoded) {
      // error
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      // decoded 
      const role = (decoded as JwtPayload).role;

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      req.user = decoded as JwtPayload;
      
      next();
    });

  });
};

export default auth;
