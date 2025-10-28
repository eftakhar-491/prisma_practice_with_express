import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { prisma } from "../../../config/db";
import { Prisma, User } from "../../../generated/prisma";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: Prisma.UserCreateInput = req.body;
    const user: User = await prisma.user.create({
      data: payload,
    });
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User created and logged in successfully",
      data: user,
    });
  }
);
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { page, limit }  = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const users: Array<Pick<User, "email">> = await prisma.user.findMany({
      select: {
        email: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  }
);

export const UserControllers = {
  createUser,
  getAllUsers,
};
