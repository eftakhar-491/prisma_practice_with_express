import { Router } from "express";
import { UserControllers } from "./user.controller";

// /api/v1/user/
const router = Router();

router.get("/users", UserControllers.getAllUsers);
router.post(
  "/create",

  UserControllers.createUser
);

export const UserRoutes = router;
