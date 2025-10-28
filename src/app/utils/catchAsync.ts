import { NextFunction, Request, Response } from "express";
import { sendResponse } from "./sendResponse";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync =
  (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: any) => {
      // next(err);
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Error occurred",
        data: err,
      });
    });
  };
