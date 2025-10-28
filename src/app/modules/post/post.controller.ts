import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { prisma } from "../../../config/db";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.authorId,
      },
    });
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Post created successfully",
      data: post,
    });
  }
);
const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await prisma.post.findMany({
      where: {
        postId: 1,
      },
      include: {
        author: true,
      },
    });
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Posts retrieved successfully",
      data: posts,
    });
  }
);
export const PostControllers = {
  createPost,
  getAllPosts,
};
