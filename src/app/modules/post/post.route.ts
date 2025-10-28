import { Router } from "express";
import { PostControllers } from "./post.controller";

// /api/v1/user/
const router = Router();

router.post(
  "/create",

  PostControllers.createPost
);
router.get(
  "/get-all-posts",

  PostControllers.getAllPosts
);

export const PostRoutes = router;
